import { pool } from '../../db/connections.js';

class Employee { // Define the Employee class with constructor information to match the database
    constructor(id, firstName, lastName, roleId) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleId = roleId;
        this.managerId = managerId;
    }
    }

    async function viewEmployees() {
        const query = `
            SELECT employee.id, employee.first_name, employee.last_name, role.title AS role_title, department.name AS department_name, role.salary, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name
            FROM employee
            JOIN role ON employee.role_id = role.id
            JOIN department ON role.department_id = department.id
            LEFT JOIN employee AS manager ON employee.manager_id = manager.id
        `;
        const result = await pool.query(query);
        return result.rows;
    }

    async function addEmployee() {
        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
        const values = [this.firstName, this.lastName, this.roleId, this.managerId];
        await pool.query(query, values);
    }



    export { Employee, viewEmployees, addEmployee };