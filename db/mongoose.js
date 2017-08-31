var mongoose = require('mongoose');
var dbConfig = require('./../config/db.js');
mongoose.Promise = require('bluebird');

mongoose.connect(dbConfig.url || process.env.MONGOLAB_URI);


module.exports= mongoose;
