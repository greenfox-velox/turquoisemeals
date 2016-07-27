'use strict';

const db = require('./db');
var con = require('./CONFIG');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var connection = con.con;
app.use(bodyParser.json());
app.use(express.static('client'));

connection.connect(function(err){
  if(err){
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});

var myMeals = db(connection);

app.post('/meals', function(req, res) {
  myMeals.addMeal(req.body, function (result) {
    res.send(result);
  });
});

app.get('/meals', function(req, res) {
  if (req.query.date) {
    myMeals.filterMeals(req.query.date, function (result) {
      res.send(result);
    });
  } else {
    myMeals.getMeal(function (result) {
      res.send(result);
    });
  }
});

app.delete('/meals/:id', function(req, res) {
  myMeals.delMeal(req.params.id, function (result) {
    res.send(result);
  });
});

app.listen(3000);
