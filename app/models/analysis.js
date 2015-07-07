var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Authenticate Schema
var Analysis = new Schema ({
    uid:    { type: String, default: ''},
    //look at time differences
    preTimer:  { type: Number},
    postTimer:  { type: Number},
    //vector of answers (1 correct, 0 wrong, null not a question)
    preAnswers:   [Boolean],
    midAnswers:     [Boolean],
    postAnswers:   [Boolean],
    //number of correct in answer vectors
    preScore: {type: Number},
    postScore: {type: Number}
})

mongoose.model('Analysis', Analysis);
