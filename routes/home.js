var express = require('express');
var hp = require('./../helpers/middlewares.js');
var Event = require('./../db/models/event.js');
var User = require('./../db/models/user.js');

module.exports = function(passport){
    var router = express.Router();

    router.get('/',hp.isLoggedIn,function(req,res){
        var user = req.user;
        var name;
        if(user.name && user.name.fname){
            name = user.name.fname;
        }
        getScheduledEvents(user._id,function(err,schedules){
            if(err || !schedules){
                console.log(err);
                req.flash('danger','There was a problem loading your events.');
            }
            if(schedules.length ==0)
                req.flash('danger','You have no scheduled events at the moment.');   
            res.render('home',{pageData: {name:name,schedules:schedules}});
        });
    });


    router.post('/',hp.isLoggedIn,function(req,res){
        if(!req.body || !req.body.data) return;
        var eventId = req.body.data;
        var user = req.user;
        var id = user._id;
        //var id = user._id;
                
    });

    return router;
    
}

function getScheduledEvents(userId,done){
        Event.find({attende:userId},function(err,results){
            if(err){
               return done(err,null);
            }
            return done(null,results);
        });

}