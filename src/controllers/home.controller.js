const indexCtrl = {};
const pool = require('../db/Database')

indexCtrl.renderIndex = async (req, res) => {
    const HomeAnime = await pool.query('SELECT posts.id,posts.image,posts.title FROM posts WHERE posts.status = "1" AND posts.type = "serie" ORDER BY posts.id DESC LIMIT 0,12')
    const HomeMovie = await pool.query('SELECT posts.id,posts.image,posts.title FROM posts WHERE posts.status = "1" AND posts.type = "movie" ORDER BY posts.id DESC LIMIT 0,12')
    const HomeEpisode = await pool.query(`
    SELECT 
    posts_episode.name as episode_name, 
    posts_episode.image as episode_image, 
    posts_season.name as season_name,
    posts_episode.id as ep_id,
    posts.id, 
    posts.title, 
    posts.self, 
    posts.image, 
    posts.cover, 
    posts.animestatus,
    posts.create_year,
    posts.imdb,
    posts_episode.created,
    posts_episode.featured
    FROM posts_episode
    LEFT JOIN posts ON posts_episode.content_id = posts.id  
    LEFT JOIN posts_season ON posts_season.id = posts_episode.season_id  
    WHERE posts.type = "serie" AND posts.status = "1" AND posts.animestatus = "En Emision" 
    ORDER BY posts_episode.id DESC
    LIMIT 0,8`)
    const HomeSlider = await pool.query(`SELECT
    posts.id, 
    slider.title, 
    posts.self,  
    slider.image, 
    posts.create_year,
    slider.body,
    slider.link,
    posts.imdb,
    posts.type,
    posts.created
    FROM slider
    LEFT JOIN posts ON posts.id = slider.content_id
    WHERE posts.status = "1" 
    ORDER BY slider.id DESC
    LIMIT 0,6`)
    const HomeStory = await pool.query(`
    SELECT 
    posts.id, 
    posts.title, 
    posts.title_sub, 
    posts.self, 
    posts.type, 
    posts.image, 
    posts.create_year,
    posts.quality,
    posts.imdb,
    posts.created,
    posts.animestatus,
    categories.name,
    categories.self as category_self
    FROM posts
    LEFT JOIN posts_category ON posts_category.content_id = posts.id  
    LEFT JOIN categories ON categories.id = posts_category.category_id  
    WHERE posts.type = "serie" AND posts.status = "1"
    GROUP BY posts_category.content_id
    ORDER BY posts.id DESC
    LIMIT 0,6`)
    var os = require('os');
    var osh = os.hostname()
    const hostvisit = await pool.query(`SELECT DK_visitas.hostname,DK_visitas.id FROM DK_visitas WHERE DK_visitas.hostname = "${osh}" LIMIT 0,1`)
    if(hostvisit.length > 0){
        
    }else {
        await pool.query(`INSERT INTO DK_visitas (visitas,hostname) VALUES ("1","${osh}")`)
    }
    res.render('Home/home', { HomeAnime, HomeEpisode,HomeSlider,HomeStory,HomeMovie })
   
    
};

indexCtrl.renderDiscovery = async (req, res) => {
    const discovery = await pool.query('SELECT * FROM posts WHERE posts.status = "1" LIMIT 10')
    res.render('Discovery/discovery', { discovery })
}
indexCtrl.page = async (req,res) => {
    const page = await pool.query(`
    
    `)
    
    res.json({page})
}
indexCtrl.renderSearch = async (req,res) => {
    const search = await pool.query(`
    SELECT * FROM posts WHERE posts.status = "1" AND posts.title LIKE "%${req.params.title}%" LIMIT 0,16`)
    res.json({search})
}

indexCtrl.renderTvLives = async (req,res) => {
    const tvlives = await pool.query(`
    SELECT 
    channels.id, 
    channels.name, 
    channels.image,
    channels.self
    FROM channels
    LIMIT 0,6
    `)
    res.render('Tv-lives/tv-lives',{tvlives})
}
indexCtrl.renderTvLive = async (req,res) => {
    const tvlive = await pool.query(`
    SELECT 
    channels.id, 
    channels.name, 
    channels.image,
    channels.embed,
    channels.self
    FROM channels
    WHERE channels.id = "${req.params.id}"
    `)
    res.render('Tv-lives/tv-live',{tvlive})
}
module.exports = indexCtrl;