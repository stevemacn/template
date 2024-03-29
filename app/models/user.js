 // Module dependencies.

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , crypto = require('crypto')
    , _ = require('underscore')
    , authTypes = ['twitter']

// User Schema
var UserSchema = new Schema({
    uid: { type: String, default: '' },
    condition: {type: String, default: ''},
    provider: { type: String, default: '' },
    hashed_password: { type: String, default: '' },
    salt: { type: String, default: '' },
    progress: {type: Number, default: 0},
    part: {type: Number, default: 0},
    apikey: {type: String, default: ''}
})

// Virtuals
UserSchema
    .virtual('password')
    .set(function(password) {
        this._password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function() { return this._password })

// Validations
var validatePresenceOf = function (value) {
    return value && value.length
}

//Validate Username
UserSchema.path('uid').validate(function (username) {
    // if authenticating by an oauth strategies, don't validate
    if (authTypes.indexOf(this.provider) !== -1) return true
        return username.length
}, 'Username cannot be blank')

UserSchema.path('uid').validate(function (username, fn) {
    var User = mongoose.model('User')
    // if authenticating by an oauth strategies, don't validate
    if (authTypes.indexOf(this.provider) !== -1) fn(true)

    // Check only when it is a new user or when email field is modified
    if (this.isNew || this.isModified('uid')) {
        User.find({ uid: username }).exec(function (err, users) {
            console.log(!err && users.length===0)
            fn(!err && users.length === 0)
        })
    } else fn(true)
}, 'Username already exists')

UserSchema.path('hashed_password').validate(function (hashed_password) {
    // if authenticating by an oauth strategies, don't validate
    if (authTypes.indexOf(this.provider) !== -1) return true
        return hashed_password.length
}, 'Password cannot be blank')


//Pre-save hook
UserSchema.pre('save', function(next) {
    if (!this.isNew) return next()
    if (!validatePresenceOf(this.password)
        && authTypes.indexOf(this.provider) === -1)
        next(new Error('Invalid password'))
    else
        next()
})

/**
 * Methods
 */

UserSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },

  generateKey: function () {
    this.apikey = Math.round(new Date().valueOf() * Math.random()) 
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function (password) {
    if (!password) return ''
    var encrypred
    try {
      encrypred = crypto.createHmac('sha1', this.salt).update(password).digest('hex')
      return encrypred
    } catch (err) {
      return ''
    }
  }
}

mongoose.model('User', UserSchema)
