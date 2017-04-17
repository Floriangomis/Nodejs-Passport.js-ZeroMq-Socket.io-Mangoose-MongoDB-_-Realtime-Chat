const mongoose = require('mongoose'),
      config = require('../config.js'),
      url = 'mongodb://' + config.ConfigObject.ipServerMongoDb;
      User = require('../models/models.js').User,
      Message = require('../models/models.js').Message,
      passport = require('passport');

let db = mongoose.connection;

mongoose.connect(url);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    
});


let fetchMessagesFromHistory = (socket) => {
    return Message.find({}).populate('postedBy').limit(40).sort({_id: -1}).exec( (err, result) => {
        if(err) {
            console.log(err);
        }
        socket.emit('retrieve-history', {history: result});
    });
};

let saveMessageInDb = ( message ) => {
    var message = new Message({time: message.time , message: message.message, postedBy: message.user_id});
    message.save(function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log( 'Message Saved : ' + result._id );
    });
};

let register = (req, res, next) => {
     User.register(new User({username: req.body.username}), req.body.password, function(err, result) {
        if (err) {
            return res.status(422).send(err);
        }
        passport.authenticate('local')(req, res, function () {
            return res.status(200).send({id: req.user._id, username: req.user.username});
        });
    });
};

module.exports = {
    fetchMessagesFromHistory: fetchMessagesFromHistory,
    saveMessageInDb: saveMessageInDb,
    register: register
};