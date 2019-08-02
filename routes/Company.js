var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var saltRounds = 10;

var Company = require("../models/Company");

router.get("/", (req, res) => {
  res.send("this page is for the compny");
});

router.post("/signup", async (req, res) => {
  var Newcompany = new Company();
  Newcompany.email = req.body.email;
  Newcompany.password = req.body.password;
  Newcompany.name = req.body.name;
  Newcompany.location = req.body.location;
  Newcompany.history = req.body.history;

  await Company.findOne({ email: Newcompany.email })
    .then(async provider => {
      if (!provider) {
        await bcrypt.genSalt(saltRounds, async (err, salt) => {
          await bcrypt.hash(Newcompany.password, salt, async (err, hash) => {
            Newcompany.password = hash;
            await Newcompany.save()
              .then(company => {
                if (company) {
                  res.send(company);
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
  Company.findOne({ email: member.email })
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

route.post("/socialupload", async (req, res) => {
  var id = req.body.id;
  var social = {};
  social.github = req.body.github;
  social.linkdin = req.body.linkdin;
  social.medium = req.body.other;
  social.other = req.body.other;

  await Company.findOne({ _id: id })
    .then(async person => {
      if (person) {
        person["social"] = social;
        await person
          .save()
          .then(value => {
            res.send(value);
          })
          .catch(err => {
            console.log("Error is ", err.message);
          });
      } else {
        res.send("Theis person doesn't exists");
      }
    })
    .catch(err => {
      console.log("Error is ", err.message);
    });
});

router.get("/companywithid", async (req, res) => {
  var id = req.body.id;
  await Company.findOne({ _id: id })
    .then(company => {
      if (company) {
        res.send(company);
      } else {
        res.send("Company doesn't exists");
      }
    })
    .catch(err => {
      console.log("Error is ", err.message);
    });
});

modules.exports = router;
