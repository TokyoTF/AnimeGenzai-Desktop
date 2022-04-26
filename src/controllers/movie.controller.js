const movieCtrl = {}
const pool = require('../db/Database')
movieCtrl.renderMovies = async(req,res) => {
    const MovieDetails = await pool.query(`SELECT * FROM posts WHERE posts.id = ${req.params.id}`)
    const PeliculaCategories = await pool.query(`
        SELECT 
        categories.id, 
        categories.name, 
        categories.self
        FROM posts_category 
        LEFT JOIN categories ON posts_category.category_id = categories.id     
        WHERE posts_category.content_id = ${req.params.id}
        ORDER BY posts_category.id ASC`)

    var arrayx = []
    function peliculaCateg() {
        PeliculaCategories.map(r => arrayx.push(r.id))
        arrayx.sort(function (a, b) {
            return a - b;
        });
        return arrayx
    }
    const peliculaSimilars = await pool.query(`
    SELECT 
    posts.id, 
    posts.title, 
    posts.title_sub, 
    posts.quality, 
    posts.image, 
    posts.self,
    posts.imdb, 
    posts.type, 
    posts.create_year,
    posts.status,
    posts.created
    FROM posts 
    LEFT JOIN posts_category ON posts_category.content_id = posts.id  
    LEFT JOIN categories ON categories.id = posts_category.category_id  
    WHERE posts.status = "1" AND posts_category.category_id IN (${peliculaCateg()}) AND posts.id NOT IN (${req.params.id}) AND posts.type = "movie"
    GROUP BY posts.id
    ORDER BY posts.id ASC
    LIMIT 0,6`)
    const MovieVideo = await pool.query(` SELECT 
        posts_video.id,  
        posts_video.name, 
        posts_video.content_id, 
        posts_video.player, 
        posts_video.sortable, 
        posts_video.embed as video_embed, 
        s.id as service_id,
        s.name as service_name,
        l.id as language_id,
        l.name as language_name
        FROM posts_video 
        LEFT JOIN videos_option AS s ON posts_video.service_id = s.id AND s.type = "service" AND posts_video.service_id IS NOT NULL
        LEFT JOIN videos_option AS l ON posts_video.language_id = l.id AND l.type = "language" AND posts_video.language_id IS NOT NULL
        WHERE posts_video.content_id = ${req.params.id}
        ORDER BY posts_video.sortable ASC`)
        
   res.render('Movie/movie',{MovieVideo,peliculaSimilars,MovieDetails})
}

module.exports = movieCtrl;