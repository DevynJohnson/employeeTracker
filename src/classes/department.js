import { pool } from '../../db/connections.js';

class Department { // Define the Department class with constructor information to match the database
    constructor(name, id) {
      this.name = name;
      this.id = id;
    }

  }

async function viewDepartments() {
    const query = 'SELECT * FROM department';
    const result = await pool.query(query);
    return result.rows;
}

async function addDepartment() {
    const query = 'INSERT INTO department (name) VALUES ($1)';
    const values = [this.name];
    await pool.query(query, values);
}

  export { Department, viewDepartments, addDepartment };