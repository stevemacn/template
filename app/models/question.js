// Example model
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Authenticate Schema
var Question = new Schema ({
    
    uid:    { type: String, default: ''},
    qid:    { type: String, default: ''},
    
    answers: {type: Object}, 
    timer:  { type: Number},
    isComplete: {type: Boolean, default: false}
})

mongoose.model('Question', Question);
