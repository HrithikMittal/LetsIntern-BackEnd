var express = require("express");
var route = express.Router();

var Question = require("../models/Question");

route.post("/question-post", (req, res) => {
  var NewQuestion = new Question({
    question: req.body.question
  });

  NewQuestion.save()
    .then(ques => {
      res.send(ques);
    })
    .catch(err => {
      console.log("Error is ", err.message);
    });
});

route.post("/question-mcq", (req, res) => {
  var id = req.body.id;
  var option_mcq = {};
  option_mcq.optionvalue = req.body.optionvalue;
  option_mcq.answer = req.body.answer;

  Question.findOne({ _id: id })
    .then(question => {
      question["options"].push(option_mcq);
      question
        .save()
        .then(value => {
          res.send(value);
        })
        .catch(err => {
          console.log("Error is ", err.message);
        });
    })
    .catch(err => {
      console.log(err);
    });
});

route.get("/", (req, res) => {
  res.send("Question is here...");
});

module.exports = route;
