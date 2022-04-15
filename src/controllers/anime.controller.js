const animeCtrl = {};
const pool = require('../db/Database')

animeCtrl.renderAnime = async (req, res) => {
    const AnimeRender = await pool.query(`SELECT * FROM posts WHERE posts.id = ${req.params.id}`)
    const AnimeSeason = await pool.query(`SELECT 
        posts_season.id,  
        posts_season.name
        FROM posts_season
        WHERE posts_season.content_id = ${req.params.id}
        ORDER BY cast(name as unsigned) ASC`);



    const AnimeEpisode = await pool.query(`SELECT 
        posts_episode.id,
        posts_episode.name,  
        posts_episode.description,  
        posts_episode.created
        FROM posts_episode
        WHERE posts_episode.status = "1" AND posts_episode.content_id = ${req.params.id} AND posts_episode.season_id = ${AnimeSeason[0].id}
        ORDER BY cast(name AS UNSIGNED) ASC`);
      
   
    const AnimeCategories = await pool.query(`
        SELECT 
        categories.id, 
        categories.name, 
        categories.self
        FROM posts_category 
        LEFT JOIN categories ON posts_category.category_id = categories.id     
        WHERE posts_category.content_id = ${req.params.id}
        ORDER BY posts_category.id ASC`)

    var arrayx = []
    function AnimeCateg() {
        AnimeCategories.map(r => arrayx.push(r.id))
        arrayx.sort(function (a, b) {
            return a - b;
        });
        return arrayx
    }

    const animeSimilar = await pool.query(`
    SELECT 
    posts.id, 
    posts.title, 
    posts.title_sub, 
    categories.name,
    categories.self as category_self,
    posts.quality, 
    posts.image, 
    posts.self, 
    posts.type, 
    posts.status,
    posts.created
    FROM posts 
    LEFT JOIN posts_category ON posts_category.content_id = posts.id  
    LEFT JOIN categories ON categories.id = posts_category.category_id  
    WHERE posts.status = "1" AND posts_category.category_id IN (${AnimeCateg()}) AND posts.id NOT IN (${req.params.id}) AND posts.type = "serie"
    GROUP BY posts.id
    ORDER BY posts.id DESC
    LIMIT 0,6
        `)
    res.render('Anime/Anime', { AnimeRender, AnimeSeason, AnimeEpisode, animeSimilar, AnimeCategories })

};

animeCtrl.seasonList = async (req, res) => {
    const AnimeEpisodes = await pool.query(`SELECT 
    posts_episode.id,
    posts_episode.name,
    posts_episode.content_id,
    posts_episode.season_id,
    posts_episode.description,  
    posts_episode.created
    FROM posts_episode
    WHERE posts_episode.status = "1" AND posts_episode.content_id = ${req.params.anime} AND posts_episode.season_id = ${req.params.season}
    ORDER BY cast(name AS UNSIGNED) ASC`);

    res.json({ AnimeEpisodes })
}

animeCtrl.renderEpisode = async (req, res) => {
    const AnimeEpisode = await pool.query(` 
    SELECT 
    posts_video.id,  
    posts_video.name,
    posts_video.content_id,
    posts_video.player, 
    posts_video.episode_id,
    posts_video.sortable, 
    posts_video.embed as video_embed, 
    s.id as service_id,
    s.name as service_name,
    l.id as language_id,
    l.name as language_name
    FROM posts_video 
    LEFT JOIN videos_option AS s ON posts_video.service_id = s.id AND s.type = "service" AND posts_video.service_id IS NOT NULL
    LEFT JOIN videos_option AS l ON posts_video.language_id = l.id AND l.type = "language" AND posts_video.language_id IS NOT NULL
    WHERE posts_video.content_id = "${req.params.id}" AND posts_video.episode_id = "${req.params.episode}"
    ORDER BY posts_video.sortable ASC`);
    const AnimeDetails = await pool.query(`
    SELECT 
    posts.id,
    posts.title,
    posts.title_sub,
    posts.image,
    posts_episode.id as ep_id,
    posts_season.id as se_id,
    posts_episode.season_id,
    posts_season.name as season_name,
    posts_episode.name as episode_name
    FROM posts 
    LEFT JOIN posts_season ON posts.id = posts_season.content_id AND posts_season.content_id IS NOT NULL
    LEFT JOIN posts_episode ON posts_season.id = posts_episode.season_id AND posts_episode.content_id IS NOT NULL
    WHERE posts.id = ${req.params.id} AND posts_episode.id = ${req.params.episode}`);

    const AnimeSeason = await pool.query(`SELECT 
    posts_season.id,  
    posts_season.name,
    posts_season.content_id
    FROM posts_season
    WHERE posts_season.content_id = ${req.params.id}
    ORDER BY cast(name as unsigned) ASC`);
    const EpisodeNext = await pool.query(`
        SELECT 
        posts.description, 
        posts.self,
        posts.id,
        posts_episode.id as ep_id,
        posts_season.id as se_id,
        posts_episode.season_id,
        posts_season.name as season_name,
        posts_episode.name as episode_name
        FROM posts 
        LEFT JOIN posts_season ON posts.id = posts_season.content_id AND posts_season.content_id IS NOT NULL
        LEFT JOIN posts_episode ON posts_season.id = posts_episode.season_id AND posts_episode.content_id IS NOT NULL
        WHERE posts.id = ${req.params.id} AND posts_episode.id = (select min(id) from posts_episode where id > ${req.params.episode} ORDER BY cast(posts_episode.name as unsigned) ASC) 
        ORDER BY cast(posts_episode.name as unsigned) ASC`);

    const EpisodePrev = await pool.query(`
        SELECT 
        posts.description, 
        posts.self,
        posts.id,
        posts_episode.id as ep_id,
        posts_season.id as se_id,
        posts_season.name as season_name,
        posts_episode.name as episode_name
        FROM posts 
        LEFT JOIN posts_season ON posts.id = posts_season.content_id AND posts_season.content_id IS NOT NULL
        LEFT JOIN posts_episode ON posts_season.id = posts_episode.season_id AND posts_episode.content_id IS NOT NULL 
        WHERE posts.id = ${req.params.id} AND posts_episode.id = (select max(id) from posts_episode where id < ${req.params.episode} ORDER BY cast(posts_episode.name as unsigned) ASC) 
        ORDER BY cast(posts_episode.id as unsigned) ASC`)
    const AnimeCategories = await pool.query(`
        SELECT 
        categories.id, 
        categories.name, 
        categories.self
        FROM posts_category 
        LEFT JOIN categories ON posts_category.category_id = categories.id     
        WHERE posts_category.content_id = ${req.params.id}
        ORDER BY posts_category.id ASC`)

    var arrayx = []
    function AnimeCateg() {
        AnimeCategories.map(r => arrayx.push(r.id))
        arrayx.sort(function (a, b) {
            return a - b;
        });
        return arrayx
    }

    const animeSimilars = await pool.query(`
        SELECT 
        posts.id, 
        posts.title, 
        posts.title_sub, 
        categories.name,
        categories.self as category_self,
        posts.quality, 
        posts.image, 
        posts.self, 
        posts.type, 
        posts.status,
        posts.created
        FROM posts 
        LEFT JOIN posts_category ON posts_category.content_id = posts.id  
        LEFT JOIN categories ON categories.id = posts_category.category_id  
        WHERE posts.status = "1" AND posts_category.category_id IN (${AnimeCateg()}) AND posts.id NOT IN (${req.params.id}) AND posts.type = "serie"
        GROUP BY posts.id
        ORDER BY posts.id DESC
        LIMIT 0,6
        `)
    res.render('Anime/Episode', { AnimeEpisode, EpisodePrev, EpisodeNext, AnimeSeason, animeSimilars, AnimeDetails })
}

animeCtrl.categories = async (req, res) => {
    const categories = await pool.query(`
    SELECT 
    categories.id,
    categories.name,
    categories.self,
    categories.color
    FROM categories
    ORDER BY featured,name ASC`)
    res.render("others/categories", { categories })
}

animeCtrl.category = async (req, res) => {
    const category = await pool.query(`
    SELECT 
    posts.id, 
    posts.title, 
    posts.title_sub, 
    categories.name,
    categories.self as category_self,
    posts.image, 
    posts.self, 
    posts.type, 
    posts.quality, 
    posts.status,
    posts.created
    FROM posts 
    LEFT JOIN posts_category ON posts_category.content_id = posts.id  
    LEFT JOIN categories ON categories.id = posts_category.category_id
    WHERE posts_category.category_id = ${req.params.cat} AND posts.status = "1" ORDER BY id DESC`)
    res.render("others/category", { category })
}
module.exports = animeCtrl;