const userCtrl = {}
const pool = require('../db/Database');
const passport = require('passport');
userCtrl.renderLoginUser = (req,res) => {
    
    res.render('User/login')
}
userCtrl.LoginUser = (req,res,next) => {
    passport.authenticate('local.login', {
        successRedirect: '/',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req,res,next);
}
userCtrl.renderLoginUser = (req,res) => {
    
    res.render('User/login')
}
userCtrl.renderProfile = async (req,res) => {;
    const profile = await pool.query(`SELECT * FROM users WHERE username = "${req.params.user}" `);
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
        posts.self, 
        posts.image, 
        posts.type
        FROM follows 
        LEFT JOIN posts ON posts.id = follows.content_id  
        WHERE follows.user_id = "${profile[0].id}" 
        ORDER BY posts.id
        LIMIT 0,100`);
    res.render('User/profile', {profile,collections,follows});
}
module.exports = userCtrl;