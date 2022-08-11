// Import and require express
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
// Import and require inquirer
const inquirer = require('inquirer');
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


// Initialise inquirer
const questions = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'options',
      message: 'What would you like to do?',
      choices: ["View all departments","View all roles","View all employees","Add a department","Add a role","Add an employee","Update an employee role","Quit"]
    }
  ])
}

// select all departments
const selectDepartment = () => {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, result) => {
    console.log("showing departments");
    console.table(result);
    questions();
  })
};

// select all roles
const selectRole = ()  => {
  const sql = `SELECT * FROM role`;
  db.query(sql, (err, result) => {
    console.log("showing roles");
    console.table(result);
    questions();
  });
};

// select all employees
const selectEmployee = ()  => {
  const sql = `SELECT * FROM employee`;
  db.query(sql, (err, result) => {
    console.log("showing employee");
    console.table(result);
    questions();
  });
};

// add a department
const addDepartment = () => {
  const sql = `INSERT INTO department (name) VALUES (?)`;
  db.query(sql, req.body.name, (err, result) => {
    console.log("department added");
    questions();
  });
};

// add a role
const addRole = () => {
  const sql = `INSERT INTO role (title, salary) VALUES (?, ?)`;
  db.query(sql, [req.body.title, req.body.salary], (err, result) => {
    console.log("role added");
    questions();
  });
};

// add an employee
const addEmployee = () => {
  const sql = `INSERT INTO employee (first_name, last_name) VALUES (?, ?)`;
  db.query(sql, [req.body.first_name, req.body.last_name], (err, result) => {
    console.log("employee added");
    questions();
  });
};

// update an employee
const updateEmployee = () => {
  const sql = `
  UPDATE employee WHERE role_id = ? JOIN role ON role.id = employee.role_id `;
  db.query(sql, req.body.role_id, (err, result) => {
    console.log("Employee updated");
    questions();
  });
};

const init = () => {
  questions()
  .then((res) => {
    switch (res.options) {
      case "View all departments":
        selectDepartment();
        break;

      case "View all roles":
        selectRole();
        break;

      case "View all employees":
        selectEmployee();
        break
    }
  })
}

init();