var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var Event = require('./event.js');
const saltRounds = 10;
var moment = require('moment');


// create a schema
var userSchema = new Schema({
  name:{fname: String,
        lname: String},
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
  created_at: Date,
  updated_at: Date
});

userSchema.pre('save', function(next) {
    var user = this;
    var currentDate = new Date();    
    if (!user.created_at)
        user.created_at = currentDate;
    user.updated_at = currentDate;    
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password'))return next();
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
    
  });

userSchema.pre('remove', function(next) {
    Event.remove({attende: this._id}).exec();
    next();
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


userSchema.methods.addEventIfNone = function(eventId,cb){
    /*
        ERROR CODES:
        0: Event was successfully added.
        1: Internal ERROR.
        2: User already has an event assigned.
    */
    var user = this;
    if(!user.event){
        Event.findOneAndUpdate({_id:eventId},{attende:this._id},function(err){
            if(err)
                return cb(err,1);
            user.event=eventId;
            user.save(function(err){
                if(err)
                    return cb(err,1);
                return cb(null,0);
            });
        });
    }else{
        return cb(null,2);
    }
    
}



var User = mongoose.model('User', userSchema);



module.exports = User;