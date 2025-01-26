import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';

const pool = new pg.Pool({
	user: 'postgres',
	password: 'password',
	host: 'localhost',
	database: 'employees_db',
	port: 5432
});
async function connectToDb () {
	try {
		await pool.connect();
		console.log('Connected to the database.');
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};
export { pool, connectToDb };