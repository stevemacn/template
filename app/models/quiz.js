var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Authenticate Schema
var Quiz = new Schema ({
    
    uid:    { type: String, default: ''},
    qid:    { type: Number, default: 0},
    answers: {type: Object}, 
    timer:  { type: Number},
    inProgress: {type: Boolean, default: false},
    isComplete: {type: Boolean, default: false}
})

mongoose.model('Quiz', Quiz);
