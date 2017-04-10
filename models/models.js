const passport = require('passport'),
      mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      passportLocalMongoose = require('passport-local-mongoose');


var userSchema = new mongoose.Schema({
    login: String,
    nickname: String,
    thumbnail: String
});

var messageSchema = new mongoose.Schema({
    time: String,
    message: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

userSchema.plugin(passportLocalMongoose);
messageSchema.plugin(passportLocalMongoose);

module.exports = {
    User: mongoose.model("User", userSchema),
    Message: mongoose.model("Message", messageSchema)
};