const { Router } = require('express')
const router = Router();

const { renderIndex, renderDiscovery,renderSearch,renderTvLives,renderTvLive,page } = require('../controllers/home.controller')

//home
router.get('/', renderIndex);

//discovery
router.get('/Discovery',renderDiscovery);
router.post('/page/:num',page)

//search
router.post('/search/:title',renderSearch);

//TV Live
router.get('/tv-lives',renderTvLives);
router.get('/tv-live/:id',renderTvLive);

module.exports = router;