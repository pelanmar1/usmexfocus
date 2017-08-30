var mongoose = require('mongoose');
var User = require('./models/user.js');
var Event = require('./models/event.js');
var moment = require('moment');

/*
Event.find({'time':{"$gte": moment('2017-09-01T17:00:00.000Z').subtract(59, 'm'), "$lt": moment('2017-09-01T17:00:00.000Z').add(1,'m')}}).exec(function(err,evs){
    if(err)
      console.log(err);
    else
      console.log(evs);
});
*/
//createTestData();


 function createFocusStaff(){
  var names = ['Minji y Pedro', 'Andrea y Xavi','Bere y Yair', 'Fernando y Rodrigo','Fernanda e Iván', ' Bárbara y Marielle', 'Mabel y Patrick'];
  var usernames = ['staff1','staff2','staff3','staff4','staff5','staff6','staff7'];
  var pass = ['minped','andxav','beryai','ferrod','feriva','barmar','mabpat'];
  var email = ['pelanmar1@gmail.com','andrealeongarcia23@gmail.com','berenice.nares26@gmail.com','feruiloba@gmail.com','ivan.zamorano.rojas@gmail.com','mariellesancheez@gmail.com','pat.rankq@gmail.com'];

  var staff;
  for(var i=0;i<names.length;i++){
    staff = new User({
      'name':{fname:names[i]},
      'username':usernames[i],
      'password':pass[i],
      'email':email[i]
    })
    //console.log(JSON.stringify(staff));
    staff.save(function(err){
      if (err){
        console.log(err);
      }else
        console.log('User created.');
      
    });

  }
}

createFocusStaff();

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






