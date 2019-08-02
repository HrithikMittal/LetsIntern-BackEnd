var express = require("express");
var route = express.Router();

var Test = require("../models/Test");
var Question = require("../models/Question");

route.post("/test-create", async (req, res) => {
  var NewTest = new Test();
  NewTest.test_name = req.body.test_name;
  NewTest.max_score = req.body.max_score;
  await NewTest.save()
    .then(test => {
      if (test) {
        res.send(test);
      } else {
        res.end(`Test Not Found`);
      }
    })
    .catch(err => {
      onmouseleave.log(`Error is `, err.message);
    });
});

route.post("/test-question", async (req, res) => {
  var id = req.body.id;
  var question = {};
  question.questionId = req.body.questionId;
  await Test.findOne({ _id: id })
    .then(async result => {
      if (result) {
        result["questions"].push(question);
        await result
          .save()
          .then(value => {
            res.send(value);
          })
          .catch(err => {
            console.log("Error is", err.message);
          });
      } else {
        res.send("Test doesn't exists");
      }
    })
    .catch(err => {
      console.log("Error is", err.message);
    });
});

route.get("/test-get", async (req, res) => {
  var id = req.body.id;
  await Test.findOne({ _id: id })
    .then(async tests => {
      var questionSet = [];
      for (var i = 0; i < tests.questions.length; i++) {
        var newid = tests.questions[i].questionId;
        await Question.findOne({ _id: newid })
          .then(async ques => {
            await questionSet.push(ques);
          })
          .catch(err => {
            console.log("Error is ", err.message);
          });
      }
      res.send(questionSet);
    })
    .catch(err => {
      console.log("Error is ", err.message);
    });
});

route.get("/test-all", async (req, res) => {
  await Test.find()
    .then(test => {
      res.send(test);
    })
    .catch(err => {
      console.log("Error is", err.message);
    });
});

route.get("/", (req, res) => {
  res.send("Hi I am test");
});

module.exports = route;
