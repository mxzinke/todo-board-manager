var mysql = require('mysql');
var util = require('util');

var pool = mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'todo-board',
    password : 'todo-board123',
    database : 'todo-board',
    debug    : false 
});

pool.query = util.promisify(pool.query) // Magic happens here.

module.exports = pool