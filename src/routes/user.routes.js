const { Router } = require('express')
const router = Router();

const { renderLoginUser,LoginUser,renderProfile } = require('../controllers/user.controller')

router.get('/user/login', renderLoginUser);
router.post('/user/login', LoginUser);
router.get('/profile/:user',renderProfile)
module.exports = router;