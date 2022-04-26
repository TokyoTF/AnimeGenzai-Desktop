const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('../keys');
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DataBase connection was closed')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DateBase has to many connections')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DataBase connection was refused')
        }
    }
    if (connection) connection.release()
    /*console.log('DB is connected')*/
    return;
})


//promisify
pool.query = promisify(pool.query)

module.exports = pool;