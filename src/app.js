const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const useragent = require('express-useragent');
const appexp = express();
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');


require('./lib/passport')


//Express
appexp.set('port', 25125);
appexp.set('views', path.join(__dirname, 'views'));

const hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(appexp.get('views'), 'layouts'),
    partialsDir: path.join(appexp.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/helpers'),
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true
    }
  })

//middlegwares
appexp.use(session({
  secret: 'keyforyoubaby',
  resave:false,
  saveUninitialized:false
}))
appexp.use(express.urlencoded({extended:false}));
appexp.use(express.json());
appexp.use(flash());
appexp.use(passport.initialize());
appexp.use(passport.session());



appexp.use((req,res,next) => {
  appexp.locals.success_msg = req.flash('success_msg');
  appexp.locals.failure_msg = req.flash('failure_msg');
  next();
})

//routes
appexp.use(useragent.express());
appexp.use(require('./routes/home.routes'))
appexp.use(require('./routes/anime.routes'))
appexp.use(require('./routes/movie.routes'))
appexp.use(require('./routes/user.routes'))
appexp.engine('.hbs', hbs.engine);
appexp.set('view engine', '.hbs');

// Static files
appexp.use(express.static(path.join(__dirname, 'public')));
module.exports = appexp