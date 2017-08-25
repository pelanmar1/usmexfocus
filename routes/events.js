var express = require('express');
var hp = require('./../helpers/middlewares.js');
var Event = require('./../db/models/event.js');
var User = require('./../db/models/user.js');

module.exports = function(passport){
    var router = express.Router();

    router.get('/',hp.isLoggedIn,function(req,res){
        var user = req.user;
        if(user.admin==false){
            res.redirect('events/show');
        }
        else{
            res.redirect('events/show_adm');
        }
    });




    

    router.get('/show',hp.isLoggedIn,function(req,res){
        var user = req.user;
        getScheduledEvents(user._id,function(err,schedules){
            if(err || !schedules){
                console.log(err);
                req.flash('danger','There was a problem loading your events.');
            }
            if(schedules.length ==0)
                req.flash('danger','You have no scheduled events at the moment.');   
            res.render('events',{pageData: {name:user.name.fname,schedules:schedules}});
        });
        
    })

    router.get('/show_adm',hp.isLoggedAndAdmin,function(req,res){
        var user = req.user;
        getScheduledEvents(user._id,function(err,schedules){
            if(err || !schedules){
                console.log(err);
                req.flash('danger','There was a problem loading your events.');
            }
            if(schedules.length ==0)
                req.flash('danger','You have no scheduled events at the moment.');   
            res.render('events_admin',{pageData: {name:user.name.fname,schedules:schedules}});
        });
    })

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