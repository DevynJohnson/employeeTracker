import { pool } from '../../db/connections.js';

class Department {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }

  // Static method to delete a department
  static async deleteDepartment(departmentId) {
    const client = await pool.connect();
    
    try {
      // Query to check if there are roles associated with the department
      const res = await client.query('SELECT title FROM role WHERE department_id = $1', [departmentId]);
      
      if (res.rows.length > 0) {
        // If roles are found, create a message with their titles
        const roleTitles = res.rows.map(role => role.title).join(', ');
        console.log(`You cannot delete a department that has roles assigned to it. Please reassign or delete the following roles: ${roleTitles} and try again.`);
        return;
      }

      // If no roles are associated, proceed with the deletion
      await client.query('DELETE FROM department WHERE id = $1', [departmentId]);
      console.log('Department deleted successfully.');

    } catch (error) {
      console.error('Error deleting department:', error);
    } finally {
      client.release();
    }
  }

  // Static method to view all departments
  static async viewDepartments() {
    const query = 'SELECT * FROM department';
    const result = await pool.query(query);
    return result.rows;
  }

  // Static method to add a new department
  static async addDepartment(name) {
    const query = 'INSERT INTO department (name) VALUES ($1)';
    const values = [name];
    await pool.query(query, values);
    console.log('Department added successfully.');
  }
}

export default Department;