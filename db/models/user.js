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
  assisting_event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
  org_event:[{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
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
  
/*
userSchema.pre('remove', function(next) {
    Event.remove({$or:[{attende: this._id},{organizer:this._id}]}).exec();
    next();
});
*/

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.methods.isAdmin = function(){
    return this.admin;
}
userSchema.methods.addAssistEventIfNone = function(eventId,cb){
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
            user.assisting_event=eventId;
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

userSchema.methods.checkValidTime = function(time,cb){
    var momTime = moment(time);
    var startTime = moment(momTime).subtract(59, 'm');
    var endTime = moment(momTime).add(59,'m');
    var user = this;
    Event.find({$and:[{organizer:user._id},
    {'time':{"$gte": startTime, "$lt": endTime}}]
}).exec(function(err,evs){
    if(err){
        console.log(err);
        return cb(err,false);
    }else{
        console.log(evs);
        return cb(null,evs!=null && evs.length==0);
    }
    });
}

userSchema.methods.addOrgEventIfNone = function(time,cb){
    /*
        ERROR CODES:
        0: Event was successfully added.
        1: Internal ERROR.
        2: User already has an event assigned.
    */
    var momTime = moment(time);
    var user = this;
    var newEvent;
    // Check if schedule allows
    user.checkValidTime(time,function(err,isValidTime){
        if(err){
            console.log(err);
            return cb(err,null);
        }
        if(isValidTime){
            newEvent= new Event({
                time:time,
                organizer:user._id
            });
            newEvent.save(function(err,ev){
          if(err){
            console.log(err);
            return cb(err,1);
          }
          user.org_event.push(ev._id);
          user.save(function(err){
                if(err)
                    return cb(err,1);
                console.log('Event with id '+ev._id+' created.')
                return cb(null,0);
            });
    });
        }else{
            console.log('User already has an event which overlaps.');
            return cb(null,2);
        }

    });
        
    
}



var User = mongoose.model('User', userSchema);



module.exports = User;