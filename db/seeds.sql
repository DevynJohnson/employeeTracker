\c employees_db;

INSERT INTO department (name) VALUES
('Nursing'),
('Human Resources'),
('IT'),
('Dietary'),
('Finance'),
('Marketing');

INSERT INTO role (title, salary, department_id) VALUES
('Nurse', 60000, (SELECT id FROM department WHERE name = 'Nursing')),
('Nurse Manager', 90000, (SELECT id FROM department WHERE name = 'Nursing')),
('HR Specialist', 50000, (SELECT id FROM department WHERE name = 'Human Resources')),
('HR Manager', 80000, (SELECT id FROM department WHERE name = 'Human Resources')),
('IT Specialist', 70000, (SELECT id FROM department WHERE name = 'IT')),
('IT Manager', 100000, (SELECT id FROM department WHERE name = 'IT')),
('Chef', 40000, (SELECT id FROM department WHERE name = 'Dietary')),
('Server', 30000, (SELECT id FROM department WHERE name = 'Dietary')),
('Culinary Director', 80000, (SELECT id FROM department WHERE name = 'Dietary')),
('Accountant', 75000, (SELECT id FROM department WHERE name = 'Finance')),
('Finance Manager', 100000, (SELECT id FROM department WHERE name = 'Finance')),
('Marketing Specialist', 60000, (SELECT id FROM department WHERE name = 'Marketing')),
('Marketing Manager', 90000, (SELECT id FROM department WHERE name = 'Marketing'));

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Jane', 'Smith', (SELECT id FROM role WHERE title = 'Nurse Manager'), NULL),
('John', 'Doe', (SELECT id FROM role WHERE title = 'Nurse'), (SELECT id FROM employee WHERE first_name = 'Jane' AND last_name = 'Smith')),
('Michael', 'Brown', (SELECT id FROM role WHERE title = 'HR Manager'), NULL),
('Emily', 'Jones', (SELECT id FROM role WHERE title = 'HR Specialist'), (SELECT id FROM employee WHERE first_name = 'Michael' AND last_name = 'Brown')),
('David', 'Wilson', (SELECT id FROM role WHERE title = 'IT Manager'), NULL),
('Sarah', 'Davis', (SELECT id FROM role WHERE title = 'IT Specialist'), (SELECT id FROM employee WHERE first_name = 'David' AND last_name = 'Wilson')),
('Linda', 'Hernandez', (SELECT id FROM role WHERE title = 'Culinary Director'), NULL),
('Laura', 'Garcia', (SELECT id FROM role WHERE title = 'Chef'), (SELECT id FROM employee WHERE first_name = 'Linda' AND last_name = 'Hernandez')),
('James', 'Martinez', (SELECT id FROM role WHERE title = 'Server'), (SELECT id FROM employee WHERE first_name = 'Linda' AND last_name = 'Hernandez')),
('Patricia', 'Gonzalez', (SELECT id FROM role WHERE title = 'Finance Manager'), NULL),
('Robert', 'Lopez', (SELECT id FROM role WHERE title = 'Accountant'), (SELECT id FROM employee WHERE first_name = 'Patricia' AND last_name = 'Gonzalez')),
('Jessica', 'Taylor', (SELECT id FROM role WHERE title = 'Marketing Manager'), NULL),
('Charles', 'Perez', (SELECT id FROM role WHERE title = 'Marketing Specialist'), (SELECT id FROM employee WHERE first_name = 'Jessica' AND last_name = 'Taylor'));