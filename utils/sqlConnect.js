const config = require('../config');
const mysql = require('mysql');

var connect = mysql.createConnection({
  host : config.host,
  port : config.port,
  user : config.user,
  password : config.password,
  database : config.database
});

module.exports = connect;
