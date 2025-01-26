import inquirer from 'inquirer';
import pg from 'pg';
import { Department, viewDepartments, addDepartment } from './classes/department.js';
import { Role, viewRoles, addRole, updateEmployeeRole } from './classes/role.js';
import { Employee, viewEmployees, addEmployee } from './classes/employee.js';
import { pool, connectToDb } from '../db/connections.js';

// Connect to the PostgreSQL database
connectToDb();

function startApp() {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    }).then(async (answers) => {
        switch (answers.action) {
            case 'View all departments':
                const departments = await viewDepartments();
                console.table(departments);
                break;
            case 'View all roles':
                const roles = await viewRoles();
                console.table(roles);
                break;
            case 'View all employees':
                const employees = await viewEmployees();
                console.table(employees);
                break;
            case 'Add a department':
                const departmentName = await inquirer.prompt({
                    type: 'input',
                    name: 'name',
                    message: 'Enter the name of the department:'
                });
                await addDepartment(departmentName.name);
                console.log('Department added successfully.');
                break;
            case 'Add a role':
                const departmentsList = await viewDepartments();
                const roleDetails = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'Enter the title of the role:'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Enter the salary for the role:'
                    },
                    {
                        type: 'list',
                        name: 'departmentId',
                        message: 'Select the department for the role:',
                        choices: departmentsList.map(department => ({ name: department.name, value: department.id }))
                    }
                ]);
                await addRole(roleDetails.title, roleDetails.salary, roleDetails.departmentId);
                console.log('Role added successfully.');
                break;
            case 'Add an employee':
                const rolesList = await viewRoles();
                const employeesList = await viewEmployees();
                const employeeDetails = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: 'Enter the first name of the employee:'
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: 'Enter the last name of the employee:'
                    },
                    {
                        type: 'list',
                        name: 'roleId',
                        message: 'Select the role for the employee:',
                        choices: rolesList.map(role => ({ name: role.title, value: role.id }))
                    },
                    {
                        type: 'list',
                        name: 'managerId',
                        message: 'Select the manager for the employee (leave blank if none):',
                        choices: [{ name: 'None', value: null }, ...employeesList.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))]
                    }
                ]);
                await addEmployee(employeeDetails.firstName, employeeDetails.lastName, employeeDetails.roleId, employeeDetails.managerId);
                console.log('Employee added successfully.');
                break;
            case 'Update an employee role':
                const employeesForUpdate = await viewEmployees();
                const rolesForUpdate = await viewRoles();
                const updateDetails = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employeeId',
                        message: 'Select the employee to update:',
                        choices: employeesForUpdate.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))
                    },
                    {
                        type: 'list',
                        name: 'newRoleId',
                        message: 'Select the new role for the employee:',
                        choices: rolesForUpdate.map(role => ({ name: role.title, value: role.id }))
                    }
                ]);
                await updateEmployeeRole(updateDetails.employeeId, updateDetails.newRoleId);
                console.log('Employee role updated successfully.');
                break;
            case 'Exit':
                pool.end();
                console.log('Goodbye!');
                process.exit();
        }
        startApp();
    });
}

startApp();