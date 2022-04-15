const { Router } = require('express')
const router = Router();

const { renderMovies } = require('../controllers/movie.controller')

//Movies
router.get('/movie/:id', renderMovies);

module.exports = router;