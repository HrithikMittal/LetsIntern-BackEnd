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

module.exports = router;
