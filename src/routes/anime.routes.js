const { Router } = require('express')
const router = Router();

const { renderAnime, renderEpisode, seasonList, categories, category,categorypreview } = require('../controllers/anime.controller')

//Anime
router.get('/anime/:id', renderAnime);

//Episode
router.get('/anime/:id/:season/:episode/:resten', renderEpisode);

//Season
router.post('/se/:anime/:season', seasonList);

//categories
router.get('/categories', categories);

// Preview Categories
router.post('/categorypreview/:pr', categorypreview);

router.get('/category/:cat', category);

module.exports = router;