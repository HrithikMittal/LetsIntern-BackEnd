var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var saltRounds = 10;

var Student = require("../models/Student");

router.get("/", (req, res) => {
  res.send("this page is for the student");
});

router.post("/register", async (req, res) => {
  var Newstudent = new Student();
  Newstudent.email = req.body.email;
  Newstudent.password = req.body.password;
  Newstudent.name = req.body.name;
  Newstudent.location = req.body.location;
  Newstudent.about = req.body.about;

  await Newstudent.findOne({ email: Newstudent.email })
    .then(async provider => {
      if (!provider) {
        await bcrypt.genSalt(saltRounds, async (err, salt) => {
          await bcrypt.hash(Newcompany.password, salt, async (err, hash) => {
            Newstudent.password = hash;
            await Newstudent.save()
              .then(stud => {
                if (stud) {
                  res.send(stud);
                } else {
                  res.send("There is a problem try again");
                }
              })
              .catch(err => {
                console.log("Error is ", err.message);
              });
          });
        });
      } else {
        res.send("This email is already registered");
      }
    })
    .catch(err => {
      console.log("Error is ", err.message);
    });
});

router.post("/login", async (req, res) => {
  var member = {};
  member.email = req.body.email;
  member.password = req.body.password;
  Student.findOne({ email: member.email })
    .then(async comp => {
      if (comp) {
        await bcrypt.compare(member.password, comp.password, (err, result) => {
          if (result) {
            res.send("User is logged in successfully...");
          } else if (err) {
            console.log("Error is ", err.message);
          } else {
            res.send("Unauthorized Access:Wrong Password");
          }
        });
      } else {
        res.send("This is not registered");
      }
    })
    .catch(err => {
      console.log("Error is ", err.message);
    });
});

router.post;

module.exports = router;
