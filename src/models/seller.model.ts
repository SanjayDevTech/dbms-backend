import { isInValid } from "../utils";
import getPool from "../database";
import { OkPacket, RowDataPacket } from "mysql2";

const pool = getPool();

export class SellerModel {
	static async create(seller: Seller) {
		const { email, pwd, hash } = seller;
		if (isInValid([email, pwd, hash])) {
			console.log("SellerModel#create: invalid params");
			return 0;
		}
		const sqlQuery =
			"INSERT INTO `seller` (`email`, `pwd`, `hash`) VALUES (?, ?, ?)";
		try {
			const [results, fields] = await pool.query<OkPacket>(sqlQuery, [
				email,
				pwd,
				hash,
			]);
			console.log("SellerModel#create: Success");
			return results.insertId;
		} catch (e) {
			console.log("SellerModel#create: Error below occurred");
			console.log(e);
			return 0;
		}
	}

	static async delete(id: number) {
		if (isInValid([id])) {
			console.log("SellerModel#delete: invalid params");
			return 0;
		}
		const sqlQuery = "DELETE FROM `seller` WHERE `id` = ?";
		try {
			const [results, fields] = await pool.query<OkPacket>(sqlQuery, [id]);
			console.log("SellerModel#delete: Success");
			return results.affectedRows;
		} catch (e) {
			console.log("SellerModel#delete: Error below occurred");
			console.log(e);
			return 0;
		}
	}

	static async update(seller: Seller) {
		const { id, email, pwd, hash } = seller;
		if (isInValid([id, email, pwd, hash])) {
			console.log("SellerModel#update: invalid params");
			return 0;
		}
		const sqlQuery = "UPDATE `seller` SET `pwd` = ?, `hash` = ? WHERE `id` = ?";
		try {
			const [results, fields] = await pool.query<OkPacket>(sqlQuery, [
				pwd,
				hash,
				id,
			]);
			console.log("SellerModel#update: success");
			return results.changedRows;
		} catch (e) {
			console.log("SellerModel#update: error below occurred");
			console.log(e);
			return 0;
		}
	}

	static async findByEmail(email: string) {
		if (isInValid([email])) {
			console.log("SellerModel#findByEmail: invalid params");
			return null;
		}
		const sqlQuery = "SELECT * FROM `seller` WHERE `email` = ?";
		try {
			const [results, fields] = await pool.query<RowDataPacket[]>(sqlQuery, [
				email,
			]);
			if (results.length === 0) {
				console.log("SellerModel#findByEmail: no row matched with passed id");
				return null;
			}
			const row = results[0];
			const seller: Seller = Seller.convert(row);
			console.log("SellerModel#findByEmail: success");
			return seller;
		} catch (e) {
			console.log("SellerModel#findByEmail: error occurred");
			console.log(e);
			return null;
		}
	}

	static async findOne(id: number) {
		if (isInValid([id])) {
			console.log("SellerModel#findOne: invalid params");
			return null;
		}
		const sqlQuery = "SELECT * FROM `seller` WHERE `id` = ?";
		try {
			const [results, fields] = await pool.query<RowDataPacket[]>(sqlQuery, [
				id,
			]);
			if (results.length === 0) {
				console.log("SellerModel#findOne: no row matched with passed id");
				return null;
			}
			const row = results[0];
			const seller: Seller = Seller.convert(row);
			console.log("SellerModel#findOne: success");
			return seller;
		} catch (e) {
			console.log("SellerModel#findOne: error occurred");
			console.log(e);
			return null;
		}
	}
}

export class Seller {
	id: number;
	email: string;
	pwd: string;
	hash: string;

	static convert(row: RowDataPacket): Seller {
		return new Seller(row["id"], row["email"], row["pwd"], row["hash"]);
	}

	constructor(id: number, email: string, pwd: string, hash: string) {
		this.id = id;
		this.email = email;
		this.pwd = pwd;
		this.hash = hash;
	}
}
