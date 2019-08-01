var express = require('express');
var route = express.Router();

route.get('/',(req,res)=>{
    res.send('Hi I am test');
});

module.exports = route;
