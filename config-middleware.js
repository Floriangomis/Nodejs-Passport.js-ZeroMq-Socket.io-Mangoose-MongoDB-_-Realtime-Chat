const 
    express = require('express'),
    morgan = require('morgan'),
    passport = require('passport'),
    ejs = require('ejs'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('./models/models.js').User,
    Message = require('./models/models.js').Message,
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    flash    = require('connect-flash');

module.exports = (app, config) => {
    // Accept Cors Request
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use(express.static('public'));
    app.use(express.static('node_modules'));
    app.use(express.static('./'));
    
    app.set('view engine', 'html');
    app.engine('html', ejs.renderFile);
    app.set('views', './app/views/');

    app.use(morgan('combined'));
    app.use(cookieParser());
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));
    // parse application/json
    app.use(bodyParser.json())

    app.use(session({ secret: 'keyboard cat' }));
    app.use(passport.initialize());
	app.use(passport.session());
    app.use(flash()); 
    
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

}