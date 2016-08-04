'use strict';

const db = require('./db');
var express = require('express');
var bodyParser = require('body-parser');

function newApp(connection) {
  var app = express();

  app.use(bodyParser.json());
  app.use(express.static('frontend'));

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
