import { isInValid } from "../utils.js";
import getPool from "../database.js";
import { OkPacket, RowDataPacket } from "mysql2";

const pool = getPool();

export class PurchaseModel {
	static async create(purchase: Purchase): Promise<number> {
		const { productId, userId, status } = purchase;
		if (isInValid([productId, userId, status])) {
			console.log("PurchaseModel#create: invalid params");
			return 0;
		}
		const sqlQuery =
			"INSERT INTO `purchase` (`user_id`, `product_id`, `status`) VALUES (?, ?, ?)";
		try {
			const [results, fields] = await pool.query<OkPacket>(sqlQuery, [
				userId,
				productId,
				status,
			]);
			console.log("PurchaseModel#create: Success");
			return results.insertId;
		} catch (e) {
			console.log("PurchaseModel#create: Error below occurred");
			console.log(e);
			return 0;
		}
	}

	static async delete(id: number): Promise<number> {
		if (isInValid([id])) {
			console.log("PurchaseModel#delete: invalid params");
			return 0;
		}
		const sqlQuery = "DELETE FROM `purchase` WHERE `id` = ?";
		try {
			const [results, fields] = await pool.query<OkPacket>(sqlQuery, [id]);
			console.log("PurchaseModel#delete: Success");
			return results.affectedRows;
		} catch (e) {
			console.log("PurchaseModel#delete: Error below occurred");
			console.log(e);
			return 0;
		}
	}

	static async deleteByUser(userId: number): Promise<number> {
		if (isInValid([userId])) {
			console.log("PurchaseModel#deleteByUser: invalid params");
			return 0;
		}
		const sqlQuery = "DELETE FROM `purchase` WHERE `user_id` = ?";
		try {
			const [results, fields] = await pool.query<OkPacket>(sqlQuery, [userId]);
			console.log("PurchaseModel#deleteByUser: Success");
			return results.affectedRows;
		} catch (e) {
			console.log("PurchaseModel#deleteByUser: Error below occurred");
			console.log(e);
			return 0;
		}
	}

	static async deleteByProduct(productId: number): Promise<number> {
		if (isInValid([productId])) {
			console.log("PurchaseModel#deleteByProduct: invalid params");
			return 0;
		}
		const sqlQuery = "DELETE FROM `purchase` WHERE `product_id` = ?";
		try {
			const [results, fields] = await pool.query<OkPacket>(sqlQuery, [
				productId,
			]);
			console.log("PurchaseModel#deleteByProduct: Success");
			return results.affectedRows;
		} catch (e) {
			console.log("PurchaseModel#deleteByProduct: Error below occurred");
			console.log(e);
			return 0;
		}
	}

	static async update(purchase: Purchase): Promise<number> {
		const { id, productId, userId, status } = purchase;
		if (isInValid([id, productId, userId, status])) {
			console.log("PurchaseModel#update: invalid params");
			return 0;
		}
		const sqlQuery =
			"UPDATE `purchase` SET `product_id` = ?, `user_id` = ?, `status` = ? WHERE `id` = ?";
		try {
			const [results, fields] = await pool.query<OkPacket>(sqlQuery, [
				productId,
				userId,
				status,
				id,
			]);
			console.log("PurchaseModel#update: success");
			return results.changedRows;
		} catch (e) {
			console.log("PurchaseModel#update: error below occurred");
			console.log(e);
			return 0;
		}
	}

	static async findMany(userId: number) {
		if (isInValid([userId])) {
			console.log("PurchaseModel#findMany: invalid params");
			return null;
		}
		const sqlQuery =
			"SELECT purchase.id, purchase.status, product.name FROM `purchase` JOIN `product` ON `product_id` = product.id WHERE `user_id` = ?";
		try {
			const [results, fields] = await pool.query<RowDataPacket[]>(sqlQuery, [
				userId,
			]);
			const purchases: Order[] = Order.convertMany(results);
			console.log("PurchaseModel#findMany: success");
			return purchases;
		} catch (e) {
			console.log("PurchaseModel#findMany: error occurred");
			console.log(e);
			return null;
		}
	}

	static async findOne(id: number): Promise<Purchase | null> {
		if (isInValid([id])) {
			console.log("PurchaseModel#findOne: invalid params");
			return null;
		}
		const sqlQuery = "SELECT * FROM `purchase` WHERE `id` = ?";
		try {
			const [results, fields] = await pool.query<RowDataPacket[]>(sqlQuery, [
				id,
			]);
			if (results.length === 0) {
				console.log("PurchaseModel#findOne: no row matched with passed id");
				return null;
			}
			const row = results[0];
			const purchase: Purchase = Purchase.convert(row);
			console.log("PurchaseModel#findOne: success");
			return purchase;
		} catch (e) {
			console.log("PurchaseModel#findOne: error occurred");
			console.log(e);
			return null;
		}
	}
}

export class Purchase {
	id: number;
	userId: number;
	productId: number;
	status: number;

	static convert(row: RowDataPacket): Purchase {
		const product = new Purchase(
			row["id"],
			row["user_id"],
			row["product_id"],
			row["status"]
		);
		return product;
	}

	static convertMany(rows: RowDataPacket[]): Purchase[] {
		return rows.map((r) => this.convert(r));
	}

	constructor(id: number, userId: number, productId: number, status: number) {
		this.id = id;
		this.userId = userId;
		this.productId = productId;
		this.status = status;
	}
}

export class Order {
	id: number;
	name: string;
	status: number;

	static convert(row: RowDataPacket): Order {
		const purchase = new Order(row["id"], row["name"], row["status"]);
		return purchase;
	}

	static convertMany(rows: RowDataPacket[]): Order[] {
		return rows.map((r) => this.convert(r));
	}

	constructor(id: number, name: string, status: number) {
		this.id = id;
		this.name = name;
		this.status = status;
	}
}
