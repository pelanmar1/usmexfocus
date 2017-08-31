var mongoose = require('mongoose');
var dbConfig = require('./../config/db.js');
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url || process.env.MONGOLAB_URI);

module.exports= mongoose;


