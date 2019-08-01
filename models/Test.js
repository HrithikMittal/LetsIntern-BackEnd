var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TestSchema = mongoose.Schema({
  test_name: {
    type: String,
    require: true
  },
  max_score: {
    type: String,
    require: true
  },
  questions: [
    {
      question: {
        type: Schema.Types.ObjectId,
        ref: "Question"
      }
    }
  ]
});

module.exports = Test = mongoose.model("Test", TestSchema);
