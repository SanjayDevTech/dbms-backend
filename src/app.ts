import express from "express";
import cors from "cors";

import authResource from "./resource/auth/index.js";
import productsResource from "./resource/products/index.js";
import purchasesResource from "./resource/purchases/index.js";
import imagesResource from "./resource/images/index.js";

import getPool from "./database.js";
import { Pool } from "mysql2/promise";

import __dirname from "../expose.js";

const pool = getPool();

const app = express();
const PORT = 7000;
app.use(cors());
app.use(express.json());

app.use("/res", express.static(__dirname + "/tmp"));
app.use("/auth", authResource);
app.use("/products", productsResource);
app.use("/purchases", purchasesResource);
app.use("/images", imagesResource);

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
				name VARCHAR(255),
				des VARCHAR(600),
				price VARCHAR(500),
				image VARCHAR(500)
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
