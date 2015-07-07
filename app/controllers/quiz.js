var mongoose = require('mongoose')
    , User = mongoose.model('User')
    , Quiz  = mongoose.model('Quiz')
    , Analysis  = mongoose.model('Analysis')

    , pretest = require('./../../config/activities.json')
    
exports.quiz = function (req, res) {

    req.send("HERE");

}
