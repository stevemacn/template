var mongoose = require('mongoose')
    , User = mongoose.model('User')
//    , Account = mongoose.model('Account')
//    , Assignment = mongoose.model("Assignment")

//Setup for logging in via twitter
var login = function (req, res) {
    
    if (req.session.returnTo) {
        res.redirect(req.session.returnTo)
        delete req.session.returnTo
        return
    }
    return res.redirect('/home')  
}

exports.authCallback = login
exports.session = login


exports.index = function (req, res) {
    if (!user) var user
    if (req.user)
        user = req.user
    else 
        var user = ""
    res.render('home/index', {
        title: 'Index',
        user: user
    })
}

exports.login = function (req, res) {
    if (!user) var user
    if (req.user)
        user = req.user
    else
        var user = ""

    msg = req.flash('loginMessage')
    res.render("users/login", {
        title: 'Login',
        user: user,
        message: msg
   })
}

exports.logout = function (req, res) {
    req.logout()
    user=""
    res.redirect("login")
}


exports.deletePerson = function (req, res) {

    user = req.user
    console.log("Deleting user: " + user.uid)
    
    User
        .findOne({uid: user.uid})
        .exec(function (err, user) {
            if (err) return next(err)
            if (user) user.remove()
            return res.redirect("login")
        })
}



//set up the signup
exports.signup = function (req, res) {
    res.render('users/signup', {
        title: 'Sign up',
        user: new User()
    })
}

exports.create = function (req, res) {
    console.log("Creating user: "+ req.body.uid)
    var user = new User(req.body)
    user.provider = 'local'
    console.log(user)
    user.save(function (err) {
        if (err) {
            console.log(err)
            return res.render('users/signup', {
                    errors: (err.errors),
                    title: 'Sign up'
             })
        }
  
        // manually login the user once successfully signed up
        req.logIn(user, function(err) {
            if (err) return next(err)
                return res.redirect('/quiz')
        })
    })
}

exports.user = function (req, res, next, id) {
    User
        .findOne({ _id : id })
        .exec(function (err, user) {
            if (err) return next(err)
            if (!user) return next(new Error('Failed to load User ' + id))
                req.profile = user
            next()
        })
}
