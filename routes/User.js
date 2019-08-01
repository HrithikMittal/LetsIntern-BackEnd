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
  User.findOne({ name: NewUser.name })
    .then(async person => {
      if (!person) {
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
      } else {
        res.send(`this username already exists`);
      }
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
    .then(async person => {
      await bcrypt.compare(
        ExistingUser.password,
        person.password,
        (err, result) => {
          if (result) {
            res.send(`User is logged in successfully...`);
          } else if (err) {
            console.log("Error is ", err.message);
          } else {
            res.send(`Unauthorized Access:Wrong Password`);
          }
        }
      );
    })
    .catch(err => {
      console.log("Error is ", err.message);
    });
});


route.post('/test-upload',(req,res)=>{
  var id = req.body.id;
  var series = {};
  series.test_name = req.body.test_name;
  series.test_score = req.body.test_score;
  series.max_score = req.body.max_score;

  User.findOne({_id:id})
    .then(person => {
      if(person){
        person["record"].push(series)
        person
          .save()
          .then(value => {
            res.send(value);
          })
          .catch(err =>
            {
              console.log('Error is ',err.message);
            }
          )
      }
      else{
        res.send(`This person doesn't exists`);
      }
    })
    .catch(err=>{
      console.log('Error is ',err.message);
    })
});


module.exports = route;
