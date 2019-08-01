var User = require("../models/User");
var express = require("express");
var route = express.Router();

route.post("/signup", async (req, res) => {
  var NewUser = new User({
    name: req.body.name,
    password: req.body.password
  });
  await NewUser.save()
    .then(person => {
      res.send(person);
    })
    .catch(err => {
      console.log("Error is ", err.message);
    });
});

route.post("/login", async (req, res) => {
  var ExistingUser = {};
  ExistingUser.name = req.body.name;
  ExistingUser.password = req.body.password;

  await User.findOne({ name: ExistingUser.name })
    .then(person => {
      if (ExistingUser.password === person.password) {
        res.send(`User is logged in successfully...`);
      } else {
        res.send(`Unauthorized Access:Wrong Password`);
      }
    })
    .catch(err => {
      console.log("Error is ", err.message);
    });
});

module.exports = route;
