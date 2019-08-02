var mongoose = require("mongoose");
var StudentSchema = mongoose.Schema({
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  location: {
    type: String,
    require: true
  },
  cv: {
    type: String
  },
  about: {
    type: String
  },
  social: {
    github: {
      type: String
    },
    linkdin: {
      type: String
    },
    medium: {
      type: String
    },
    other: {
      type: String
    }
  },
  qualification: [
    {
      degree: { type: String },
      marks: { type: String }
    }
  ],
  expert: [
    {
      skill: { type: String },
      marks: { type: String }
    }
  ],
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

module.exports = Student = mongoose.model("Student", StudentSchema);
