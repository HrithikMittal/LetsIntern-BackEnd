var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CompanySchema = mongoose.Schema({
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
  }
});

module.exports = Company = mongoose.model("Company", CompanySchema);
