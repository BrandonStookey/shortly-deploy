var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var bluebird = require('bluebird');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username : {
    type: String,
    required: true,
    index: {unique : true}
  },
  password: {
    type: String,
    required: true
  }
});

var User = mongoose.model("User", userSchema);

User.comparePassword = function(candidatePassword, savedPassword, cb) {
  bcrypt.compare(candidatePassword, savedPassword, function(err, isMatch) {
    if(err){
      cb(err);
    }
    cb(null, isMatch);
  });
};

userSchema.pre("save", function(next){
  var cipher = bluebird.promisify(brcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash){
      this.password = hash;
      next();
  });
});

module.exports = User;

