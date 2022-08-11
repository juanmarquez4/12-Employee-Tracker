// Import and require express
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
// Import and require inquirer
// const inquirer = require('inquirer');q
// Import and require console.table
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Coffeemug35.',
    database: 'business_db'
  },
  console.log(`Connected to the business_db database.`)
);

// routes
// select all departments
app.get('/api/department', (req, res) => {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, result) => {
    console.log("/api/department GET request");
    res.send(JSON.stringify(result));
  })
});

// select all roles
app.get('/api/role', (req, res) => {
  const sql = `SELECT * FROM role`;
  db.query(sql, (err, result) => {
    console.log("/api/role GET request");
    res.send(JSON.stringify(result));
  });
});

// select all employees
app.get('/api/employee', (req, res) => {
  const sql = `SELECT * FROM employee`;
  db.query(sql, (err, result) => {
    console.log("/api/employee GET request");
    res.send(JSON.stringify(result));
  });
});

// add a department
app.post('/api/add-department', (req, res) => {
  const sql = `INSERT INTO department (name) VALUES (?)`;
  db.query(sql, req.body.name, (err, result) => {
    res.send(JSON.stringify(result));
  });
});

// add a role
app.post('/api/add-role', (req, res) => {
  const sql = `INSERT INTO role (title, salary) VALUES (?, ?)`;
  db.query(sql, [req.body.title, req.body.salary], (err, result) => {
    res.send(JSON.stringify(result));
  });
});

// add an employee
app.post('/api/add-employee', (req, res) => {
  const sql = `INSERT INTO employee (first_name, last_name) VALUES (?, ?)`;
  db.query(sql, [req.body.first_name, req.body.last_name], (err, result) => {
    res.send(JSON.stringify(result));
  });
});

// update an employee
app.put('/api/update-employee', (req, res) => {
  const sql = `
  UPDATE employee
  WHERE role_id = ?
  JOIN role ON role.id = employee.role_id `;
  db.query(sql, req.body.role_id, (err, result) => {
    res.send(JSON.stringify(result));
  });
});

// // Hardcoded query: DELETE FROM course_names WHERE id = 3;

// db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// // Query database
// db.query('SELECT * FROM course_names', function (err, results) {
//   console.log(results);
// });

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
