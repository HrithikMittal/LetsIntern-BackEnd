const mongoose = require("mongoose");
var UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  record: [
    {
      test_name: {
        type: String,
        require: true
      },
      test_score: {
        type: String,
        require: true
      },
      max_score: {
        type: String,
        require: true
      }
    }
  ]
});

module.exports = User = mongoose.model("Users", UserSchema);
