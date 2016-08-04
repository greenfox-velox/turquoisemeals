'use strict';

var tape = require('tape');
var sinon = require('sinon');
var supertest = require('supertest');
var meal = require('../db');
var newApp = require('../server');

tape('addmeal calls query', function(t) {
  var mockConnection = {
    query: sinon.spy()
  };
  var testMealModule = meal(mockConnection);
  testMealModule.addMeal({name: 'alma'});
  t.ok(mockConnection.query.called);
  t.end();
});

tape('addmeal calls query with proper sql', function(t) {
  var mockConnection = {
    query: sinon.spy()
  };
  var testMealModule = meal(mockConnection);

  var testMeal = {
    name: 'alma',
    calories: 2,
    date: 'ma'
  };

  var expectedSQL = 'INSERT INTO meals SET ?';

  testMealModule.addMeal(testMeal);
  t.ok(mockConnection.query.calledWithMatch(expectedSQL, testMeal));
  t.end();
});

tape('delMeal calls query with proper sql', function(t) {
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

tape('filterMeals calls query with proper sql', function(t) {
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

tape('getMeal calls query with proper sql', function(t) {
  var mockConnection = {
    query: sinon.spy()
  };
  var testMealModule = meal(mockConnection);

  var expectedSQL = 'SELECT * FROM meals;';

  testMealModule.getMeal();
  t.ok(mockConnection.query.calledWithMatch(expectedSQL));
  t.end();
});

tape('Get method content type is json and correct', function(t) {
  var mockConnection = {
    query: function(sql, cb) {
      cb(null, [{}, {}, {}]);
    }
  };
  var app = newApp(mockConnection);
  supertest(app)
    .get('/meals')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) {
        t.fail();
      }
      t.same(res.body, {meals: [{}, {}, {}]}, 'Meals as expected');
      t.end();
    });
});

// tape('Post method content type is json', function(t) {
//   var mockConnection = {
//     query: function(sql, cb) {
//       cb(null, [{}, {}, {}])
//     }
//   };
//   supertest(app)
//     .post('/meals')
//     .send(item)
//     .expect(200)
//     .expect('Content-Type', /json/)
//     .end(function(err) {
//       if (err) {
//         t.fail();
//       }
//       t.end();
//     });
// });
//
// tape('Delete method content type is json', function(t) {
//   var item = { id: 400 };
//   var mockConnection = {
//     query: function(sql, cb) {
//       cb(null, [{}, {}, {}])
//     }
//   };
//   supertest(app)
//     .delete('/meals/:id')
//     .send(item)
//     .expect(200)
//     .expect('Content-Type', /json/)
//     .end(function(err) {
// // res and test with tape
//       if (err) {
//         t.fail();
//       }
//       t.end();
//     });
// });
