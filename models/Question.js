var mongoose = require("mongoose");
const QuestionSchema = mongoose.Schema({
  question: {
    type: String,
    require: true
  },
  options: [
    {
      type: String,
      isanswer: Boolean
    }
  ]
});

module.exports = Question = mongoose.model("Question", QuestionSchema);
