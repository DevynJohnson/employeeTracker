import { pool } from '../../db/connections.js';

class Role { // Define the Role class with constructor information to match the database
    constructor(title, salary, departmentId, id) {
      this.title = title;
      this.salary = salary;
      this.departmentId = departmentId;
      this.id = id;
    }
  }

  async function viewRoles() {
    const query = 'SELECT * FROM role';
    const result = await pool.query(query);
    return result.rows;
}

  async function addRole() {
    const query = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)';
    const values = [this.title, this.salary, this.departmentId];
    await pool.query(query, values);
  }

  async function updateEmployeeRole() {
    const query = 'UPDATE employee SET role_id = $1 WHERE id = $2';
    const values = [this.roleId, this.id];
    await pool.query(query, values);
  }

  export { Role, viewRoles, addRole, updateEmployeeRole };