module.exports = function(app, passport, streamable) {

    //authentication
    var isLoggedIn = function(req, res, next) {
        if (req.isAuthenticated()) return next()
        return res.redirect("/login")
    }

    var handleError = function(err, req, res, next) {
       
        //if provided an object
        if (err.err) return errObj(err) 
       
        //else provided a string
        return res.json(503, {
            "error": err
        })
       
        function errObj(err) {
            
            var msg = {} 

            if (err.tip) msg.tip = err.tip
            if (err.err) msg.error = err.err

            return res.json(503, msg)
        }
    }

    //user routes
    var users = require('../app/controllers/users')
    app.get('/signup', users.signup, handleError)
    app.post('/users', users.create, handleError)
    app.get('/login', users.login, handleError)
    app.get('/logout', users.logout)
    
    app.post('/users/session',
        passport.authenticate('local-log', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })
    )

    //quiz routes
    var quiz = require('../app/controllers/quiz')
    app.get('/', isLoggedIn, function(req, res) {
    
        if (!user) var user;
        if (req.user) var user = req.user;
        else var user = ""

        res.render('angular/summary', { user: user})
    
    })

}
