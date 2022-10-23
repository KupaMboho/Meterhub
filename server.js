//https://www.youtube.com/watch?v=EN6Dx22cPRI
const express = require("express");
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "meterhub",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected");

  return db;
});

const app = express();

// Create database
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE meterhub";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("Database created");
  });
});

//create table
app.get("/createMeters", (req, res) => {
  let sql =
    "CREATE TABLE meters(id int AUTO_INCREMENT, name varchar(250), PRIMARY KEY (id))";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("Meters table created");
  });
});

//Inset data into the the db TABLE
app.get("/addMeter", (req, res) => {
  let post = { name: "Meter1" };
  let sql = "INSERT INTO meters SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(err);
    res.send("Meter Added");
  });
});

//get all orders
app.get("/orders", (req, res) => {
  let sql =
    "Select * from orders LEFT JOIN meter_reading ON orders.meter_number = meter_reading.reading_id WHERE meter_reading.reading is null;";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

//get single clients
app.get("/orders/:id", (req, res) => {
  let sql = `SELECT * FROM orders where id=${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.listen("3000", () => {
  console.log("Server started at port 3000");
});
