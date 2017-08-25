var mongoose = require('mongoose');
var User = require('./models/user.js');
var Event = require('./models/event.js');
var moment = require('moment');

//createTestData();


function createTestData(){
    admin = new User({
            name:{fname: 'Pedro',
                  lname: 'Lanzagorta'},
            username:'pelanmar1',
            password: 'clapton1' ,
            admin: true
            });
    user = new User({
      name:{fname: 'Rafael',
            lname: 'Lanzagorta'},
      username:'raflan',
      password: 'cocacola' ,
      admin: false
      });
    
    admin.save(function(err){
      if(err){
        console.log(err);
      }
      console.log('User created');
    });

    user.save(function(err){
      if(err){
        console.log(err);
      }
      console.log('User created');
    });

    for(var i=0;i<5;i++){
        event = new Event({time: moment().format()});
        event.save(function(err){
          if(err){
            console.log(err);
          }
          console.log('Event created.')
    });
    }

}


/*
User.findOne({ username: 'pelanmar1' }).
populate('event').
exec(function (err, user) {
  if (err) 
    console.log(err);
  else
    console.log(moment(user.event.time));
});
*/




