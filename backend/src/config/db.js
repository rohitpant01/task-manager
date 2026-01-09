const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "rohit",
  database: "backend_assignment"
});

module.exports = db;
