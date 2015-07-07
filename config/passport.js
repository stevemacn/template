//Configure passport
//Each authentication type has a different strategy
//Users are managed by the database collection 'User'

var mongoose = require('mongoose')
    , LocalStrategy = require('passport-local').Strategy
    , User = mongoose.model('User')

module.exports = function (passport, config) {

    //======================
    //passport session setup
    //======================
    
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function(id, done) {
        User.findOne({ _id: id }, function (err, user) {
            done(err, user)
        })
    })

    //======================
    //passport login setup
    //======================
    
    //Won't be called unless both user and pwd are entered.

    passport.use('local-log', new LocalStrategy({
           usernameField: 'uid',
           passwordField: 'password',
           passReqToCallback: true 
    },
    
    function(req, uid, password, done) {
        User.findOne({ uid: uid }, function (err, user) {
            if (err) { return done(err) }
            if (!user) 
                return done(null, false, 
                    req.flash('loginMessage', 'No user was found'))
    
            if (!user.authenticate(password)) 
                return done(null, false, 
                    req.flash('loginMessage', 'Invalid password'))
            
            return done(null, user)
        })    
    }))

    
    //======================
    //passport signup setup
    //======================
    
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'uid',
        conditionField: 'code',
        passwordField: 'password'
    },
    function (req, uid, cond, password, done) {
                console.log("signup")
                console.log(uid)
        User.findOne({uid: uid}, function(err, user) {
            if (err) return done(err)
                console.log("user")
                console.log(user)
            if (user)
                return done(null, false,
                        req.flash('signupMessage', 'User already associated to an email'))

        })
    }))

}

