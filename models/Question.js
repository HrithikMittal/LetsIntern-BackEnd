var mongoose = require("mongoose");
const QuestionSchema = mongoose.Schema({
  question: {
    type: String,
    require: true
  },
  options: [
    {
      optionvalue: {
        type: String,
        require: true
      },
      answer: {
        type: String,
        require: true
      }
    }
  ]
});

module.exports = Question = mongoose.model("Question", QuestionSchema);
