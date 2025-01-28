import { pool } from '../../db/connections.js';

class Role {
  constructor(title, salary, departmentId, id) {
    this.title = title;
    this.salary = salary;
    this.departmentId = departmentId;
    this.id = id;
  }

  // Static method to view all roles, including department names
  static async viewRoles() {
    const query = `
      SELECT role.id, role.title, role.salary, department.name AS department_name
      FROM role
      JOIN department ON role.department_id = department.id
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  // Static method to add a new role
  static async addRole(title, salary, departmentId) {
    const query = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)';
    const values = [title, salary, departmentId];
    await pool.query(query, values);
    console.log('Role added successfully.');
  }

  // Static method to update an employee's role
  static async updateEmployeeRole(employeeId, newRoleId, managerId) {
    const query = `
      UPDATE employee
      SET role_id = $1, manager_id = $2
      WHERE id = $3;
    `;
    await pool.query(query, [newRoleId, managerId || null, employeeId]);
  }

  // Static method to delete a role
static async deleteRole(roleId) {
  const client = await pool.connect();
  
  try {
    // Query to check if there are employees assigned to the role
    const res = await client.query('SELECT first_name, last_name FROM employee WHERE role_id = $1', [roleId]);
    
    if (res.rows.length > 0) {
      // If employees are found, create a message with their names
      const employeeNames = res.rows.map(emp => `${emp.first_name} ${emp.last_name}`).join(', ');
      console.log(`You cannot delete a role that has employees assigned to it. Please reassign or delete the following employees: ${employeeNames} and try again.`);
      return;
    }
    
    // If no employees are assigned, proceed with the deletion
    await client.query('DELETE FROM role WHERE id = $1', [roleId]);
    console.log('Role deleted successfully.');

  } catch (error) {
    console.error('Error deleting role:', error);
  } finally {
    client.release();
  }
}
};

export default Role;