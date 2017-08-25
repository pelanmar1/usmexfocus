
module.exports = {
    isLoggedIn :function(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }

        res.redirect('/login');
    },
    isLoggedAndAdmin:function(req,res,next){
        if(req.isAuthenticated() && req.user && req.user.admin==true){
            return next();
        }
        res.redirect('/login');
        
    }
}