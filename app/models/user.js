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

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function(){
//     this.on('creating', this.hashPassword);
//   },
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

// hashPassword: function(){
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

