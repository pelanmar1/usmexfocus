var express = require('express');
var hp = require('./../helpers/middlewares.js');
var Event = require('./../db/models/event.js');
var User = require('./../db/models/user.js');
var moment = require('moment-timezone');


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
        res.locals.UTC2CDT = UTC2CDT;        
        var user = req.user;
        if(user.admin==true){
            res.redirect('show_adm');
            return;
        }
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
        res.locals.formatAttende=formatAttende;
        res.locals.UTC2CDT = UTC2CDT;
        var user = req.user;
        if(user.admin==false){
            res.redirect('show');
            return;
        }
        getOrgEvents(user._id,function(err,schedules){
            if(err || !schedules){
                console.log(err);
                req.flash('danger','There was a problem loading your events.');
            }
            if(schedules.length ==0)
                req.flash('danger','You have no scheduled events at the moment.');   
            res.render('events_admin',{pageData: {name:user.name.fname,schedules:schedules}});
        });
    });

    router.post('/add',hp.isLoggedAndAdmin,function(req,res){
    /*
        ERROR CODES:
        0: Event was successfully added.
        1: Internal ERROR.
        2: User already has an event assigned.
    */
    if(!req.body || !req.body.data) return;
    var time = req.body.data;
    var user = req.user;
 
    user.addOrgEventIfNone(time,function(err,msg){
        if(err){
            console.log(err);
            req.flash('danger','There was a problem adding your event. Please try again.');
        }else{
            if(msg!=null && msg==1){
                req.flash('danger','There was a problem adding your event. Please try again.');
            }
            if(msg!=null && msg==2){
                req.flash('warning','You already have an event scheduled within one hour before and after the requested time.');
            }else{
                req.flash('success','Your event was added successfuly.');
            }
        }
        res.send({redirect: '/events'});

    });    
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

function getOrgEvents(userId,done){
        /*Event.find({organizer:userId},function(err,results){
            if(err){
               return done(err,null);
            }
            return done(null,results);
        });
        */
        Event.find({organizer:userId}).populate('attende').exec(function(err,results){
            if(err){
               return done(err,null);
            }
            return done(null,results);
        });
}
function formatAttende(att){
    var text='';
    if (att==null)
        return;
    if(att.name&&att.name.fname)
        text+=att.name.fname;
        if(att.name.lname)
            text+=att.name.lname;
            if(att.email)
                text+='\n'+att.email;
                if(att.tel)
                    text+='\n'+att.tel;
                
    return text;
    }

function UTC2CDT(time){
    var timeCDT =time;
    timeCDT = moment(timeCDT).tz('America/Mexico_City').format('dddd MMM DD YYYY HH:mm [GMT]Z (z)')
    return timeCDT;
}