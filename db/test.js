var mongoose = require('./mongoose.js');
var User = require('./models/user.js');
var Event = require('./models/event.js');
var moment = require('moment');
var aplicantes = require('./../users.js');

//createTestData();
//createTestUser();
//addApplicants();
var staff;
staff = new User({
  'name':{fname:'Gary Soto'},
  'username':'gary',
  'password':'gary',
  'email':'gary@gmail.com',
  //'admin':false,
  'tel':'+5215565606962'
})
staff.save(function(err){
  if (err){
    console.log(err);
  }else
    console.log('User created.');
  
});

function addApplicants(){
    var i;
    var temp;
    for(i=0;i<aplicantes.length;i++){
      temp = aplicantes[i];
      user = new User({
        'name':{
          'fname':temp.fname,
          'lname':temp.lname
        },
        'username':temp.email,
        'email':temp.email,
        'tel':temp.tel,
        'password':temp.password,
        'admin':false
      });
      user.save(function(err){
        if(err)
          console.log(err);
        else
          console.log('Aplicante '+user.email+' ha sido creado.');
      })
    }

}

function createTestUser(){
  var staff;
  staff = new User({
    'name':{fname:'Simbad el marino'},
    'username':'simbad',
    'password':'simbad',
    'email':'simbad@gmail.com',
    //'admin':false,
    'tel':'+5215565606962'
  })
  staff.save(function(err){
    if (err){
      console.log(err);
    }else
      console.log('User created.');
    
  });
  staff = new User({
    'name':{fname:'Bob Dylan'},
    'username':'dylan',
    'password':'dylan',
    'email':'dylan@gmail.com',
    'admin':true
  })
  //console.log(JSON.stringify(staff));
  staff.save(function(err){
    if (err){
      console.log(err);
    }else
      console.log('User created.');
    
  });
}


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
      'email':email[i],
      'admin':true
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






