
var express = require('express');


module.exports = function(passport){
    var router = express.Router();

    router.get('/', function (req, res) {
        res.render('login');
    });

    router.post('/',passport.authenticate('login', {
        successRedirect: '/events',
        failureRedirect: '/login',
        badRequestMessage : 'Bad request',
        failureFlash: true
      })
    );


    return router;
}





/*

var checkInputs = function(req,res,next){
  req.checkBody('username','Username is required.').notEmpty();
  req.checkBody('password','Password is required.').notEmpty();
  // Errors
  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      res.render('login',{errors:result.array()});
      return;
    }
    next();
  });
}
*/
