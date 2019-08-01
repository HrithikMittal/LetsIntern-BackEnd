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

app.post("/user/signup", (req, res) => {
  var NewUser = User({
    name: req.body.name,
    password: req.body.password
  });
  NewUser.save();
});

app.listen(port, () => {
  console.log(`Servering is listening on PORT ${port}`);
});
