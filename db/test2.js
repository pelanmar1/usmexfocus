
var bcrypt = require('bcrypt');
const saltRounds = 10;


var user1;
user1 = {
  'name':{fname:'user1'},
  'username':'user1',
  'password':'user1',
  'email':'user1@gmail.com',
  'tel':'+5215565606962',
  'admin':false  
};


var user2;
user2 = {
  'name':{fname:'user2'},
  'username':'user2',
  'password':'user2',
  'email':'user2@gmail.com',
  'tel':'+5215565606962',
  'admin':false
};

var admin1;
admin1 = {
  'name':{fname:'admin1'},
  'username':'admin1',
  'password':'admin1',
  'email':'admin1@gmail.com',
  'tel':'+5215565606962',
  'admin':true
};

//printNewUser(user1);
//printNewUser(user2);
//printNewUser(admin1);

admin = new User({
    name:{fname: 'Pedro',
          lname: 'Lanzagorta'},
    username:'pelanmar1',
    password: 'clapton1' 
    });


function printNewUser(user){
    var currentDate = new Date();    
    if (!user.created_at)
        user.created_at = currentDate;
    user.updated_at = currentDate;    
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            console.log(JSON.stringify(user));
        });
    });
}