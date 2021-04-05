import express from "express";
import cors from "cors";

import authResource from "./resource/auth/index.js";
import productsResource from "./resource/products/index.js";
import purchasesResource from "./resource/purchases/index.js";

import getPool from "./database.js";
import { Pool } from "mysql2/promise";

const pool = getPool();

const app = express();
const PORT = 7000;
app.use(cors());
app.use(express.json());
app.use("/auth", authResource);
app.use("/products", productsResource);
app.use("/purchases", purchasesResource);

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at *:${PORT}`);
});

const dbInit = async (pool: Pool) => {
	try {
		await pool.query(`
			CREATE TABLE IF NOT EXISTS user (
				id INT PRIMARY KEY AUTO_INCREMENT,
				email VARCHAR(255),
				pwd VARCHAR(255),
				hash VARCHAR(255)
			);
	`);
		await pool.query(`
			CREATE TABLE IF NOT EXISTS seller (
				id INT PRIMARY KEY AUTO_INCREMENT,
				email VARCHAR(255),
				pwd VARCHAR(255),
				hash VARCHAR(255)
			)
	`);
		await pool.query(`
			CREATE TABLE IF NOT EXISTS product (
				id INT PRIMARY KEY AUTO_INCREMENT,
				seller_id INT,
				name VARCHAR(50),
				des VARCHAR(300),
				price VARCHAR(30),
				image VARCHAR(50)
			)
	`);
		await pool.query(`
			CREATE TABLE IF NOT EXISTS purchase (
				id INT PRIMARY KEY AUTO_INCREMENT,
				user_id INT,
				product_id INT,
				status INT
			)
	`);
	} catch (e) {
		console.log(e);
	}
};

dbInit(pool);
