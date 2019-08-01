var mongoose = require("mongoose");
var express = require("express");
var bodyparser = require("body-parser");
var app = express();
var User = require("./models/User");

mongoose
  .connect("mongodb://localhost:27017/quiz")
  .then(() => {
    console.log("Database is connected successfully...");
  })
  .catch(err => {
    console.log("Error is ", err.message);
  });

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`Hi I am Adhikansh Mittal`);
});

app.post("/user/signup", async (req, res) => {
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

app.post("/user/login", async (req, res) => {
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

app.listen(port, () => {
  console.log(`Servering is listening on PORT ${port}`);
});
