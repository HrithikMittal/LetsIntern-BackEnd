var User = require("../models/User");
var express = require("express");
var route = express.Router();
var bcrypt = require("bcrypt");
var saltRounds = 10;

route.post("/signup", async (req, res) => {
  var NewUser = new User({
    name: req.body.name,
    password: req.body.password
  });

  await bcrypt.genSalt(saltRounds, async (err, salt) => {
    await bcrypt.hash(NewUser.password, salt, async (err, hash) => {
      NewUser.password = hash;
      await NewUser.save()
        .then(person => {
          res.send(person);
        })
        .catch(err => {
          console.log("Error is ", err.message);
        });
    });
  });
});

route.post("/login", async (req, res) => {
  var ExistingUser = {};
  ExistingUser.name = req.body.name;
  ExistingUser.password = req.body.password;

  await User.findOne({ name: ExistingUser.name })
    .then(person => {
      bcrypt.compare(ExistingUser.password, person.password, (err, result) => {
        if (result) {
          res.send(`User is logged in successfully...`);
        } else if (err) {
          console.log("Error is ", err.message);
        } else {
          res.send(`Unauthorized Access:Wrong Password`);
        }
      });
    })
    .catch(err => {
      console.log("Error is ", err.message);
    });
});

module.exports = route;