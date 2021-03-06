var mongoose = require("mongoose");
var express = require("express");
var bodyparser = require("body-parser");
var app = express();

var User = require("./routes/User");
var Question = require("./routes/Question");
var Test = require("./routes/test");
var Internship = require("./routes/Internship");
var Company = require("./routes/Company");
var Student = require("./routes/Student");

mongoose
  .connect("mongodb://localhost:27017/letsintern")
  .then(() => {
    console.log("Database is connected successfully...");
  })
  .catch(err => {
    console.log("Error is ", err.message);
  });

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const port = process.env.PORT || 3000;

app.use("/question", Question);
app.use("/user", User);
app.use("/test", Test);
app.use("/intern", Internship);
app.use("/company", Company);
app.use("/student", Student);

app.listen(port, () => {
  console.log(`Servering is listening on PORT ${port}`);
});
