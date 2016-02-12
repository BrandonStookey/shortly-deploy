var mongoose = require('mongoose');
var mongoUri = process.env.MONGOLAB_URI || "mongodb://localhost/shortlydb";

mongoose.connect(mongoUri);

var db = mongoose.connection;

db.on("err", console.error.bind(console, "connection error:"));
db.once("open", function(){
  console.log("mongodb connection open");
});

module.exports = db;
