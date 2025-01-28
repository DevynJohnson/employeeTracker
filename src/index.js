import inquirer from 'inquirer';
import Table from 'cli-table3';
import figlet from 'figlet';
import Department from './classes/department.js';
import Role  from './classes/role.js';
import Employee from './classes/employee.js';
import { connectToDb, pool } from '../db/connections.js';

// Connect to the PostgreSQL database
connectToDb();

// Function to display ASCII Art
function displayAsciiArt() {
    return new Promise((resolve, reject) => {
        figlet('Employee Tracker', (err, data) => {
            if (err) {
                reject('Something went wrong with the ASCII art.');
                return;
            }
            console.log(data);
            resolve();
        });
    });
}

// Table rendering functions
function renderDepartmentsTable(departments) {
    const table = new Table({
        head: ['Department ID', 'Department Name'],
        colWidths: [15, 30]
    });

    departments.forEach(department => {
        table.push([department.id, department.name]);
    });

    console.log(table.toString());
}

function renderRolesTable(roles) {
    const table = new Table({
        head: ['Role ID', 'Role Title', 'Salary', 'Department Name'],
        colWidths: [15, 30, 15, 30]
    });

    roles.forEach(role => {
        table.push([role.id, role.title, role.salary, role.department_name]);
    });

    console.log(table.toString());
}

function renderEmployeesTable(employees) {
    const table = new Table({
        head: ['Employee ID', 'First Name', 'Last Name', 'Role', 'Department', 'Salary', 'Manager Name'],
        colWidths: [15, 20, 20, 25, 20, 15, 30]
    });

    employees.forEach(employee => {
        table.push([
            employee.id,
            employee.first_name,
            employee.last_name,
            employee.role_title,
            employee.department_name,
            employee.salary,
            employee.manager_first_name ? `${employee.manager_first_name} ${employee.manager_last_name}` : 'None'
        ]);
    });

    console.log(table.toString());
}

// Main app function with Inquirer prompts
async function startApp() {
    // Display ASCII art before the menu
    await displayAsciiArt();

    // Show the menu after the ASCII art is displayed
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
            'Delete a department',
            'Delete a role',
            'Delete an employee',
            'Exit'
        ]
    }).then(async (answers) => {
        switch (answers.action) {
            case 'View all departments':
                const departments = await Department.viewDepartments();
                renderDepartmentsTable(departments);
                break;

            case 'View all roles':
                const roles = await Role.viewRoles();
                renderRolesTable(roles);
                break;

            case 'View all employees':
                const employees = await Employee.viewEmployees();
                renderEmployeesTable(employees);
                break;

            case 'Add a department':
                const departmentName = await inquirer.prompt({
                    type: 'input',
                    name: 'name',
                    message: 'Enter the name of the department:'
                });
                await Department.addDepartment(departmentName.name);
                console.log('Department added successfully.');
                break;

            case 'Add a role':
                const departmentsListForRole = await Department.viewDepartments();
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
                        choices: departmentsListForRole.map(department => ({ name: department.name, value: department.id }))
                    }
                ]);
                await Role.addRole(roleDetails.title, roleDetails.salary, roleDetails.departmentId);
                console.log('Role added successfully.');
                break;

            case 'Add an employee':
                const rolesListForEmployee = await Role.viewRoles();
                const allEmployeesList = await Employee.viewEmployees();
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
                        choices: rolesListForEmployee.map(role => ({ name: role.title, value: role.id }))
                    },
                    {
                        type: 'list',
                        name: 'managerId',
                        message: 'Select the manager for the employee (leave blank if none):',
                        choices: [{ name: 'None', value: null }, ...allEmployeesList.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))]
                    }
                ]);
                await Employee.addEmployee(employeeDetails.firstName, employeeDetails.lastName, employeeDetails.roleId, employeeDetails.managerId);
                console.log('Employee added successfully.');
                break;

            case 'Update an employee role':
                const employeesForUpdate = await Employee.viewEmployees();
                const rolesForUpdate = await Role.viewRoles();
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
                await Role.updateEmployeeRole(updateDetails.employeeId, updateDetails.newRoleId);
                console.log('Employee role updated successfully.');
                break;

            case 'Delete a department':
                const departmentsList = await Department.viewDepartments();
                const departmentToDelete = await inquirer.prompt({
                    type: 'list',
                    name: 'departmentId',
                    message: 'Select a department to delete:',
                    choices: departmentsList.map(department => ({ name: department.name, value: department.id }))
                });
                await Department.deleteDepartment(departmentToDelete.departmentId);
                console.log('Department deleted successfully.');
                break;

            case 'Delete a role':
                const rolesList = await Role.viewRoles();
                const roleToDelete = await inquirer.prompt({
                    type: 'list',
                    name: 'roleId',
                    message: 'Select a role to delete:',
                    choices: rolesList.map(role => ({ name: role.title, value: role.id }))
                });
                await Role.deleteRole(roleToDelete.roleId);
                console.log('Role deleted successfully.');
                break;

            case 'Delete an employee':
                const allEmployees = await Employee.viewEmployees();
                const employeeToDelete = await inquirer.prompt({
                    type: 'list',
                    name: 'employeeId',
                    message: 'Select an employee to delete:',
                    choices: allEmployees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))
                });
                await Employee.deleteEmployee(employeeToDelete.employeeId);
                console.log('Employee deleted successfully.');
                break;

            case 'Exit':
                pool.end();
                console.log('Goodbye!');
                process.exit();
        }

        // Restart the app after completing the action
        startApp();
    });
}

startApp();