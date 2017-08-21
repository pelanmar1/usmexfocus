var LocalStrategy = require('passport-local').Strategy;
var User = require('./../db/models/user.js');

module.exports = function(passport){

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    
    passport.use('login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback : true
    },
    function(req, username, password, done) { 
        process.nextTick(function(){
            User.findOne({ 'username' :  username }, 
                function(err, user) {
                    if (err){
                        return done(err);
                    }
                    if (!user){
                        console.log('User Not Found with username '+username+'.');
                        return done(null, false, req.flash('danger', 'User Not found.'));                 
                    }
                    user.comparePassword(password,function(err,isMatch){
                        if(err){
                            return done(err);
                        }
                        if(!isMatch){
                            console.log('Invalid Password.');
                            return done(null,false,req.flash('danger','Invalid Password.'));
                        }
                        return done(null,user);
                    });
                }
            );

        });
        
    }));

}