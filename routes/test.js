var express = require('express');
var route = express.Router();

var Test = require('../models/Test');

route.get('/',(req,res)=>{
    res.send('Hi I am test');
});

module.exports = route;
