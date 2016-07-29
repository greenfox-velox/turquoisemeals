'use strict';

var test = require('tape');
var functionTest = require('./functionstotest');

var obj1 = [{calories:1, deleted:false}, {calories:2, deleted:true}, {calories:3, deleted:false}];
var obj2= [{calories:1, deleted:false}, {calories:2, deleted:true}, {calories:3, deleted:false}];

test('is returning a number', function (t) {
  t.notEqual(functionTest.calculateCalories(obj1), 'a');
  t.end();
});

test('is considering deleted true', function (t) {
  t.notEqual(functionTest.calculateCalories(obj2), 6);
  t.end();
});

test('is returning the correct sum', function (t) {
  t.equal(functionTest.calculateCalories(obj2), 4);
  t.end();
});

test('is returned time in good format', function (t) {
  t.equal(functionTest.formatDate(new Date(1980, 5, 26, 12, 20)), '1980-6-26 12-20');
  t.end();
});

test('is returning the correct time and date', function (t) {
  t.equal(functionTest.formatDate(new Date(1982, 5, 26, 10, 20)), '1982-6-26 10-20');
  t.end();
});
