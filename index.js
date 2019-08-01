var mongoose = require("mongoose");
var express = require("express");
var app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`Hi I am Adhikansh Mittal`);
});

app.listen(port, () => {
  console.log(`Servering is listening on PORT ${port}`);
});
