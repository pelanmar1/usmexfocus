var mongoose = require('mongoose');
var dbConfig = require('./../../config/db.js');
var Schema = mongoose.Schema;
var User = require('./user.js');
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url || process.env.MONGOLAB_URI);

// create a schema
var eventSchema = new Schema({
    time: { type: Date, required: true},
    attende: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    organizer:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    created_at: Date,
    updated_at: Date
});

eventSchema.pre('save', function(next) {
    var event = this;
    var currentDate = new Date();    
    if (!event.created_at)
        event.created_at = currentDate;
    event.updated_at = currentDate;
    next();
  });

/*
eventSchema.pre('remove', function(next) {
    User.remove({$or:[{assisting_event: this._id},{org_event:this._id}]}).exec();
    next();
});
*/
eventSchema.methods.getTime = function(){
    return moment(this.time)
}
var event = mongoose.model('Event', eventSchema);


module.exports = event;