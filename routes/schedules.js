var express = require('express');
var hp = require('./../helpers/middlewares.js');
var Event = require('./../db/models/event.js');
var User = require('./../db/models/user.js');
var moment = require('moment-timezone');

module.exports = function(passport){
    var router = express.Router();

    router.get('/',hp.isLoggedIn,function(req,res){
        res.locals.UTC2CDT = UTC2CDT;        
        var user = req.user;
        var name = "hacker"
        if(user.name && user.name.fname){
            name = user.name.fname;
        }
        if(user.admin==true){
            res.redirect('events')
            return;
        }
        getAvailableSchedules(function(err,schedules){
            if(err || !schedules){
                console.log(err);
                req.flash('danger','There was a problem loading available schedules.');
                
            }else{
            if(schedules.length ==0)
                req.flash('danger','There are no schedules available at the moment.');   
            }
            res.render('schedules',{pageData: {name:name,schedules:schedules}});
        });
    })


    router.post('/',hp.isLoggedIn,function(req,res){
        if(!req.body || !req.body.data) return;
        var eventId = req.body.data;
        var user = req.user;
        user.addAssistEventIfNone(eventId,function(err,errCode){
            var msg = getErrorMessage(errCode);
            if(err){
                console.log(err);
            }
            req.flash(msg.type,msg.text);
            res.send({redirect: '/schedules'});
        });
        
    });

    return router;
    
}

function getErrorMessage(errorCode){
    /*
        ERROR CODES:
        0: Event was successfully added.
        1: Internal ERROR.
        2: User already has an event assigned.
    */
    var type;
    var msg;
    switch(errorCode){
        case 0:
            type='success';
            msg='Your interview has been scheduled.';
            break;
        case 2:
            type='warning';
            msg='It seems you already have an interview scheduled.';
            break;
        default:
            type='danger';
            msg='There was a problem setting up your interview. Please try again.';
            break;
    }
    return {'type':type,'text':msg};
}

function getAvailableSchedules(done){
        Event.find({$and:[{attende:{$exists:false}},{time:{$gte: new Date()}}]}
        ,function(err,results){
            if(err){
               return done(err,null);
            }
            return done(null,results)
        });

}


function UTC2CDT(time){
    var timeCDT =time;
    //timeCDT = moment(timeCDT).tz('America/Mexico_City').format('dddd MMM DD YYYY HH:mm [GMT]Z (z)');
    timeCDT = moment(timeCDT).tz('America/Mexico_City').format('dddd MMM DD YYYY HH:mm (z)');
    return timeCDT;
}