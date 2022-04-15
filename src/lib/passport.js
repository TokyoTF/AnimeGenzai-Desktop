const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../db/Database');
const helpers = require('../lib/helpers')
passport.use('local.login', new LocalStrategy({
    usernameField: 'usermail',
    passwordField: 'userpassword',
    passReqToCallback: true
}, async (req, usermail,userpassword,done) => {
   const rows = await pool.query('SELECT * FROM users WHERE email = ? ', [usermail]);
    if (rows.length > 0) {
        const user = rows[0]
        const validPassword = await helpers.matchPassword(userpassword, user.password);
        if(validPassword) {
            done(null, user, req.flash('success_msg', 'Welcome ' + user.name));
        }else {
            done(null, false, req.flash('failure_msg', 'Incorrect Password'));
        }
    }else {
        return done(null, false, req.flash('message', 'The user does not exist'));
    }
}))

//passport.serializeUser((user,done) => {

//});