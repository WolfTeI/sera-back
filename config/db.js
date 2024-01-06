const mysql = require("promise-mysql");

function getConn() {
  const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "742369",
    database: "sera",
  });
  return conn;
}

module.exports = { getConn };