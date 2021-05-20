const mysql = require('mysql');
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_DATABASE,
    database: process.env.DB_DATABASE,
});
db.connect();
module.exports = db;