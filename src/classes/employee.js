import { pool } from '../../db/connections.js';

class Employee {
  constructor(id, firstName, lastName, roleId, managerId) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.roleId = roleId;
    this.managerId = managerId;
  }

  // Static method to view all employees, including role, department, and manager details
  static async viewEmployees() {
    try {
      const query = `
        SELECT employee.id, employee.first_name, employee.last_name, 
               role.title AS role_title, department.name AS department_name, 
               role.salary, manager.first_name AS manager_first_name, 
               manager.last_name AS manager_last_name
        FROM employee
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error viewing employees:', error);
      throw error;
    }
  }

  // Static method to add a new employee
  static async addEmployee(firstName, lastName, roleId, managerId) {
    try {
      const query = `
        INSERT INTO employee (first_name, last_name, role_id, manager_id) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *
      `;
      const values = [firstName, lastName, roleId, managerId];
      const result = await pool.query(query, values);
      const newEmployee = result.rows[0];
      console.log(`Employee "${newEmployee.first_name} ${newEmployee.last_name}" added successfully.`);
      return newEmployee;
    } catch (error) {
      console.error('Error adding employee:', error);
      throw error;
    }
  }

  // Static method to delete an employee
  static async deleteEmployee(employeeId) {
    try {
      const query = 'DELETE FROM employee WHERE id = $1 RETURNING *';
      const result = await pool.query(query, [employeeId]);
      if (result.rowCount > 0) {
        console.log(`Employee with ID ${employeeId} deleted successfully.`);
        return result.rows[0];
      } else {
        console.log(`No employee found with ID ${employeeId}.`);
        return null;
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error;
    }
  }
}

export default Employee;