import inquirer from 'inquirer';
import pg from 'pg';

// Inquierer prompts will need to include: 
// view all departments (department names and department ids)
// view all roles (job title, role id, the department that role belongs to, and the salary for that role)
// view all employees (employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to)
// add a department (enter the name of the department and that department is added to the database) 
// add a role (name, salary, and department for the role and that role is added to the database) 
// add an employee (employee's first name, last name, role, and manager, and that employee is added to the database) 
// and update an employee role (select an employee to update and their new role and this information is updated in the database)


