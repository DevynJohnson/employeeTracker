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
        const query = 'SELECT * FROM employee';
        const result = await pool.query(query);
        return result.rows;
    }

    async function addEmployee() {
        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
        const values = [this.firstName, this.lastName, this.roleId, this.managerId];
        await pool.query(query, values);
    }



    export { Employee, viewEmployees, addEmployee };