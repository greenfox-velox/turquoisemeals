'use strict';

var tape = require('tape');
var sinon = require('sinon');

var meal = require('./db');

tape('addmeal calls query', function (t) {
  var mockConnection = {
    query: sinon.spy()
  };
  var testMealModule = meal(mockConnection);
  testMealModule.addMeal({name: "alma"});
  t.ok(mockConnection.query.called);
  t.end();
});


tape('addmeal calls query with proper sql', function (t) {
  var mockConnection = {
    query: sinon.spy()
  };
  var testMealModule = meal(mockConnection);

  var testMeal = {
    name: "alma",
    calories: 2,
    date: "ma"
  };

  var expectedSQL = 'INSERT INTO meals SET ?';

  testMealModule.addMeal(testMeal);
  t.ok(mockConnection.query.calledWithMatch(expectedSQL, testMeal));
  t.end();
});

tape('delMeal calls query with proper sql', function (t) {
  var mockConnection = {
    query: sinon.spy()
  };
  var testMealModule = meal(mockConnection);

  var id = 2;

  var expectedSQL = 'UPDATE meals SET deleted = true WHERE id = ?';

  testMealModule.delMeal(id);
  t.ok(mockConnection.query.calledWithMatch(expectedSQL, 2));
  t.end();
});

tape('filterMeals calls query with proper sql', function (t) {
  var mockConnection = {
    query: sinon.spy()
  };
  var testMealModule = meal(mockConnection);

  var date = 'date';

  var expectedSQL = 'SELECT * FROM meals WHERE meals.date LIKE ?;';
  var expectedDate = 'date%';

  testMealModule.filterMeals(date);
  t.ok(mockConnection.query.calledWithMatch(expectedSQL, expectedDate));
  t.end();
});

tape('getMeal calls query with proper sql', function (t) {
  var mockConnection = {
    query: sinon.spy()
  };
  var testMealModule = meal(mockConnection);

  var expectedSQL = 'SELECT * FROM meals;'

  testMealModule.getMeal();
  t.ok(mockConnection.query.calledWithMatch(expectedSQL));
  t.end();
});
