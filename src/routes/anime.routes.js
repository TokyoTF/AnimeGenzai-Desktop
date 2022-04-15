const { Router } = require('express')
const router = Router();

const { renderAnime,renderEpisode,seasonList,categories,category } = require('../controllers/anime.controller')

//Anime
router.get('/anime/:id', renderAnime);

//Episode
router.get('/anime/:id/:season/:episode/:resten', renderEpisode);

//Season
router.get('/se/:anime/:season',seasonList),

//categories
router.get('/categories',categories);

router.get('/category/:cat',category);

module.exports = router;