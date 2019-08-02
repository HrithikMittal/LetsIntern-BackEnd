var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var InternshipSchema = mongoose.Schema({
  name: {
    type: String,
    require: String
  },
  dateOfPosting: {
    type: Date,
    require: String
  },
  expiryDate: {
    type: Date,
    require: true
  },
  qualities: {
    type: String,
    require: true
  },
  timeOfInternship: {
    type: String,
    require: true
  },
  benifits: {
    type: String,
    require: true
  },
  student: {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student"
    }
  }
});

module.exports = Internship = mongoose.model("Internship", InternshipSchema);
