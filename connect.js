var config = require('./CONFIG');

var mysql = require('mysql');
var connection = mysql.createConnection(config.sqlEntry);

connection.connect(function(err) {
  if (err) {
    console.log('Error connecting to Db');
    console.log(err);
    return;
  }
  console.log('Connection established');
});

module.exports.connection = connection;
