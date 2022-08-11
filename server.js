// Import and require express
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
// Import and require inquirer
const inquirer = require('inquirer');
// Import and require console.table
const cTable = require('console.table');

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

  return inquirer.prompt({
      type: 'list',
      name: 'options',
      message: 'What would you like to do?',
      choices: ["View all departments","View all roles","View all employees","Add a department","Add a role","Add an employee","Quit"]
    })
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
        break;

      case "Add a department":
        addDepartment();
        break;

      case "Add a role":
        addRole();
        break;

      case "Add an employee":
        addEmployee();
        break;
      
      case "Update an employee role":
        updateEmployee();
        break;

      case "Quit":
        console.log("Thank you")
       return   
    }
  })
};

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

// add a department`
const addDepartment = () => {
  inquirer.prompt([
  {
      type: 'input',
      name: 'department_name',
      message: 'what is the name of the department?'
  }
  ])
  .then((answer) => {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    db.query(sql, [answer.department_name], (err, result) => {
      console.log("department added");
      questions();
    });
  }) 
  
};

// add a role
const addRole = () => {
  inquirer.prompt([
  {
    type: 'input',
    name: 'role_title',
    message: 'what is the title of the role?'
  },
  {
    type: 'input',
    name: 'role_salary',
    message: 'what is the salary of the role?'
  },
  {
    type: 'input',
    name: 'role_department_id',
    message: 'what is the department id of the role?'
  }
  ])
  .then( (answer) => {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`;
    db.query(sql, [answer.role_title, answer.role_salary, parseInt(answer.role_department_id)], (err, result) => {
      console.log(err)
      console.log("role added");
      questions();
    });
  })
};

// add an employee
const addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'employee_first_name',
      message: 'what is the first name of the employee?'
    },
    {
      type: 'input',
      name: 'employee_last_name',
      message: 'what is the last name of the employee?'
    },
    {
      type: 'input',
      name: 'employee_role',
      message: 'what is the role of the employee?'
    },
    {
      type: 'input',
      name: 'employee_manager_id',
      message: 'What is the manager id of the employee?'
    }
    ])
    .then((answer) => {
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`;
      db.query(sql, [answer.employee_first_name, answer.employee_last_name, parseInt(answer.employee_role), answer.employee_manager_id ], (err, result) => {
        console.log(err);
        console.log("employee added");
        questions();
      });
    })
};

const init = () => {
  questions()
}

init();