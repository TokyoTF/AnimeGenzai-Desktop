const userCtrl = {}
const pool = require('../db/Database');
const passport = require('passport');
userCtrl.renderLoginUser = (req, res) => {

    res.render('User/login')
}
userCtrl.LoginUser = (req, res, next) => {
    passport.authenticate('local.login', {
        successRedirect: '/',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req, res, next);
}
userCtrl.renderLoginUser = (req, res) => {

    res.render('User/login')
}
userCtrl.renderProfile = async (req, res) => {
    const profile = await pool.query(`
    SELECT
    users.id,
    users.name,
    users.banner,
    users.data,
    users.username,
    users.avatar
    FROM users 
    WHERE username = "${req.params.user}" `);

    var social = profile.map(row => {
        return JSON.parse(row.data);
    });


    const collections = await pool.query(`
    SELECT 
    collections.id,
    collections.name,
    collections.user_id,
    collections.color,
    collections.created,
    users.username,
    users.avatar,
    IFNULL(p.toplam, 0) AS toplam
    FROM collections 
    LEFT JOIN (
      SELECT collection_id, count(collections_post.content_id) AS toplam
      FROM collections_post 
  GROUP BY collection_id
    ) p ON (collections.id = p.collection_id)
    LEFT JOIN users ON users.id = collections.user_id
    WHERE collections.user_id = "${profile[0].id}"
    LIMIT 0,30`);

    const follows = await pool.query(`
        SELECT 
        posts.id, 
        posts.title,  
        posts.imdb,
        posts.quality,
        posts.status,
        posts.animestatus,
        posts.image, 
        posts.type
        FROM follows 
        LEFT JOIN posts ON posts.id = follows.content_id  
        WHERE follows.user_id = "${profile[0].id}" AND posts.status = "1"
        ORDER BY posts.id
        LIMIT 0,40`);
    const followsanime = await pool.query(`
    SELECT 
    posts.id, 
    posts.title,  
    posts.imdb,
    posts.quality,
    posts.status,
    posts.animestatus,
    posts.image, 
    posts.type
    FROM reactions 
    LEFT JOIN posts ON posts.id = reactions.content_id  
    WHERE reactions.reaction = "up" AND reactions.user_id = "${profile[0].id}" AND posts.status = "1"
    ORDER BY posts.id
    LIMIT 0,30
    `);

    res.render('User/profile', { profile, collections, follows, followsanime,social });
}

userCtrl.collectionpreview = async (req, res) => {

    const colletionspreviewcomplete = await pool.query(`
    SELECT 
        collections_post.id, 
        posts.id as content_id,
        categories.name,
        categories.self as category_self,
        posts.title,  
        posts.type,  
        posts.self,   
        posts.image
        FROM collections_post 
        LEFT JOIN posts ON collections_post.content_id = posts.id     
        LEFT JOIN posts_category ON posts_category.content_id = posts.id  
        LEFT JOIN categories ON categories.id = posts_category.category_id  
        WHERE collections_post.collection_id = "${req.params.id}"
        GROUP BY posts.id
        ORDER BY collections_post.sortable ASC`);
    return res.json(colletionspreviewcomplete);
}

module.exports = userCtrl;