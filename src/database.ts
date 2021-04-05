import mysql from "mysql";

const poolOptions = {
	connectionLimit: 5,
	host: "localhost",
	user: "dbms-user",
	password: "dbms-pass",
	database: "ecommerce",
};

let pool: mysql.Pool;

export default function getPool(): mysql.Pool {
	if (pool) {
		return pool;
	}
	pool = mysql.createPool(poolOptions);
	return pool;
}
