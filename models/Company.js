var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CompanySchema = mongoose.Schema({
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
  history: {
    type: String,
    require: true
  },
  Internship: {
    InternshipId: {
      type: Schema.Types.ObjectId,
      ref: "Internship"
    }
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
  }
});

module.exports = Company = mongoose.model("Company", CompanySchema);
