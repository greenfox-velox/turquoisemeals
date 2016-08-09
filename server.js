'use strict';

var db = require('./db');
var express = require('express');
var bodyParser = require('body-parser');

function newApp(connection) {
  var app = express();

  app.use(bodyParser.json());
  app.use(express.static('frontend'));
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });


  var myMeals = db(connection);

  app.post('/meals', function(req, res) {
    myMeals.addMeal(req.body, function(result) {
      res.send(result);
    });
  });

  app.get('/meals', function(req, res) {
    if (req.query.date) {
      myMeals.filterMeals(req.query.date, function(result) {
        res.send(result);
      });
    } else {
      myMeals.getMeal(function(result) {
        res.send(result);
      });
    }
  });

  app.delete('/meals/:id', function(req, res) {
    myMeals.delMeal(req.params.id, function(result) {
      res.send(result);
    });
  });
  return app;
}

module.exports = newApp;
