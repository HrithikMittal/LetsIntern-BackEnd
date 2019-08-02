var mongoose = require("mongoose");
var StudentSchema = mongoose.Schema({
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
  ]
});

module.exports = Student = mongoose.model("Student", StudentSchema);
