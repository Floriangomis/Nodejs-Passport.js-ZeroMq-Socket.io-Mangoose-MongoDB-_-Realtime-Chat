const passport = require('passport'),
      mongoDb = require('../mongo-db/index.js')

module.exports = (app, config) => {
    // Serve The app
    app.get('/', function (req, res) {
         res.render('index');
    });
    // Register for User
    app.post('/register', function(req, res, next) {
        mongoDb.register(req, res, next);
    });
    // Login for User
    app.post('/log', passport.authenticate('local'), (req, res) => {
        return res.status(200).send({id: req.user._id, username: req.user.username});
    });

};  