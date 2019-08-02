var express = require("express");
var router = express.Router();

var Internship = require("../models/Internship");

router.get("/", (req, res) => {
  res.send(`This is the Internship Routes`);
});

router.post("/internship-post", async (req, res) => {
  var NewInternship = Internship();
  NewInternship.name = req.body.name;
  NewInternship.dateOfPosting = req.body.dateOfPosting;
  NewInternship.expiryDate = req.body.expiryDate;
  NewInternship.qualities = req.body.qualities;
  NewInternship.benifits = req.body.benifits;
  NewInternship.timeOfInternship = req.body.timeOfInternship;
  NewInternship.benifits = req.body.benifits;

  await NewInternship.save()
    .then(async intern => {
      if (intern) {
        res.send(intern);
      } else {
        res.send(`Due to some problem Internship is not save`);
      }
    })
    .catch(err => {
      console.log("Error is ", err.message);
    });
});

router.get("/internship-get", async (req, res) => {
  await Internship.find()
    .then(intern => {
      if (intern) {
        res.send(intern);
      } else {
        res.send(`There is no internship`);
      }
    })
    .catch(err => {
      console.log("Error is ", err.message);
    });
});

router.post("/internship-apply", async (req, res) => {
  var internshipId = req.body.internshipId;
  var studentId = req.body.studentId;
  var student = {};
  student.studentId = studentId;
  await Internship.findOne({ _id: internshipId })
    .then(async intern => {
      if (intern) {
        intern["students"].push(student);
        await intern
          .save()
          .then(value => {
            if (value) {
              res.send(value);
            } else {
              res.send("Try Again There is some problem");
            }
          })
          .catch(err => {
            console.log("Error is ", err.message);
          });
      } else {
        res.send("this Internship doesn't exists");
      }
    })
    .catch(err => {
      console.log("Error is ", err.message);
    });
});

module.exports = router;
