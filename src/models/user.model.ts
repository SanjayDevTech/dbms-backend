import { isInValid } from "../utils.js";
import getPool from "../database.js";
import { OkPacket, RowDataPacket } from "mysql2";

const pool = getPool();

export class UserModel {
	static async create(user: User): Promise<number> {
		const { email, pwd, hash } = user;
		if (isInValid([email, pwd, hash])) {
			console.log("UserModel#create: invalid params");
			return 0;
		}
		const sqlQuery =
			"INSERT INTO `user` (`email`, `pwd`, `hash`) VALUES (?, ?, ?)";
		try {
			const [results, fields] = await pool.query<OkPacket>(sqlQuery, [
				email,
				pwd,
				hash,
			]);
			console.log("UserModel#create: Success");
			return results.insertId;
		} catch (e) {
			console.log("UserModel#create: Error below occurred");
			console.log(e);
			return 0;
		}
	}

	static async delete(id: number): Promise<number> {
		if (isInValid([id])) {
			console.log("UserModel#delete: invalid params");
			return 0;
		}
		const sqlQuery = "DELETE FROM `user` WHERE `id` = ?";
		try {
			const [results, fields] = await pool.query<OkPacket>(sqlQuery, [id]);
			console.log("UserModel#delete: Success");
			return results.affectedRows;
		} catch (e) {
			console.log("UserModel#delete: Error below occurred");
			console.log(e);
			return 0;
		}
	}

	static async update(user: User) {
		const { id, email, pwd, hash } = user;
		if (isInValid([id, email, pwd, hash])) {
			console.log("UserModel#update: invalid params");
			return 0;
		}
		const sqlQuery = "UPDATE `user` SET `pwd` = ?, `hash` = ? WHERE `id` = ?";
		try {
			const [results, fields] = await pool.query<OkPacket>(sqlQuery, [
				pwd,
				hash,
				id,
			]);
			console.log("UserModel#update: success");
			return results.changedRows;
		} catch (e) {
			console.log("UserModel#update: error below occurred");
			console.log(e);
			return 0;
		}
	}

	static async findByEmail(email: string) {
		if (isInValid([email])) {
			console.log("UserModel#findByEmail: invalid params");
			return null;
		}
		const sqlQuery = "SELECT * FROM `user` WHERE `email` = ?";
		try {
			const [results, fields] = await pool.query<RowDataPacket[]>(sqlQuery, [
				email,
			]);
			if (results.length === 0) {
				console.log("UserModel#findByEmail: no row matched with passed id");
				return null;
			}
			const row = results[0];
			const user: User = User.convert(row);
			console.log("UserModel#findByEmail: success");
			return user;
		} catch (e) {
			console.log("UserModel#findByEmail: error occurred");
			console.log(e);
			return null;
		}
	}

	static async findByCredentials(email: string, hash: string) {
		if (isInValid([email, hash])) {
			console.log("UserModel#findByEmail: invalid params");
			return null;
		}
		const sqlQuery = "SELECT * FROM `user` WHERE `email` = ? AND hash = ?";
		try {
			const [results, fields] = await pool.query<RowDataPacket[]>(sqlQuery, [
				email,
				hash,
			]);
			if (results.length === 0) {
				console.log("UserModel#findByEmail: no row matched with passed id");
				return null;
			}
			const row = results[0];
			const user: User = User.convert(row);
			console.log("UserModel#findByEmail: success");
			return user;
		} catch (e) {
			console.log("UserModel#findByEmail: error occurred");
			console.log(e);
			return null;
		}
	}

	static async findOne(id: number) {
		if (isInValid([id])) {
			console.log("UserModel#findOne: invalid params");
			return null;
		}
		const sqlQuery = "SELECT * FROM `user` WHERE `id` = ?";
		try {
			const [results, fields] = await pool.query<RowDataPacket[]>(sqlQuery, [
				id,
			]);
			if (results.length === 0) {
				console.log("UserModel#findOne: no row matched with passed id");
				return null;
			}
			const row = results[0];
			const user: User = User.convert(row);
			console.log("UserModel#findOne: success");
			return user;
		} catch (e) {
			console.log("UserModel#findOne: error occurred");
			console.log(e);
			return null;
		}
	}
}

export class User {
	id: number;
	email: string;
	pwd: string;
	hash: string;

	static convert(row: RowDataPacket): User {
		return new User(row["id"], row["email"], row["pwd"], row["hash"]);
	}

	constructor(id: number, email: string, pwd: string, hash: string) {
		this.id = id;
		this.email = email;
		this.pwd = pwd;
		this.hash = hash;
	}
}
