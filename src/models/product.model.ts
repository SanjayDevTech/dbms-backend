import { isInValid } from "../utils.js";
import getPool from "../database.js";
import { OkPacket, RowDataPacket } from "mysql2";

const pool = getPool();

export class ProductModel {
	static async create(product: Product): Promise<number> {
		const { sellerId, name, des, price, image } = product;
		if (isInValid([sellerId, name, des, price, image])) {
			console.log("ProductModel#create: invalid params");
			return 0;
		}
		const sqlQuery =
			"INSERT INTO `product` (`seller_id`, `name`, `des`, `price`, `image`) VALUES (?, ?, ?, ?, ?)";
		try {
			const [results, fields] = await pool.query<OkPacket>(sqlQuery, [
				sellerId,
				name,
				des,
				price,
				image,
			]);
			console.log("ProductModel#create: Success");
			return results.insertId;
		} catch (e) {
			console.log("ProductModel#create: Error below occurred");
			console.log(e);
			return 0;
		}
	}

	static async delete(id: number) {
		if (isInValid([id])) {
			console.log("ProductModel#delete: invalid params");
			return 0;
		}
		const sqlQuery = "DELETE FROM `product` WHERE `id` = ?";
		try {
			const [results, fields] = await pool.query<OkPacket>(sqlQuery, [id]);
			console.log("ProductModel#delete: Success");
			return results.affectedRows;
		} catch (e) {
			console.log("ProductModel#delete: Error below occurred");
			console.log(e);
			return 0;
		}
	}

	static async update(product: Product): Promise<number> {
		const { id, sellerId, name, des, price, image } = product;
		if (isInValid([id, sellerId, name, des, price, image])) {
			console.log("ProductModel#update: invalid params");
			return 0;
		}
		const sqlQuery =
			"UPDATE `product` SET `seller_id` = ?, `name` = ?, `des` = ?, `price` = ?, `image` = ? WHERE `id` = ?";
		try {
			const [results, fields] = await pool.query<OkPacket>(sqlQuery, [
				sellerId,
				name,
				des,
				price,
				image,
				id,
			]);
			console.log("ProductModel#update: success");
			return results.changedRows;
		} catch (e) {
			console.log("ProductModel#update: error below occurred");
			console.log(e);
			return 0;
		}
	}

	static async findMany(sellerId: number): Promise<Product[] | null> {
		if (isInValid([sellerId])) {
			console.log("ProductModel#findMany: invalid params");
			return null;
		}
		const sqlQuery = "SELECT * FROM `product` WHERE `seller_id` = ?";
		try {
			const [results, fields] = await pool.query<RowDataPacket[]>(sqlQuery, [
				sellerId,
			]);
			const products: Product[] = Product.convertMany(results);
			console.log("ProductModel#findMany: success");
			return products;
		} catch (e) {
			console.log("ProductModel#findMany: error occurred");
			console.log(e);
			return null;
		}
	}

	static async findBySearch(search: string): Promise<Product[] | null> {
		if (isInValid([search])) {
			console.log("ProductModel#findBySearch: invalid params");
			return null;
		}
		const sqlQuery = "SELECT * FROM `product` WHERE `name` LIKE ?";
		try {
			const [results, fields] = await pool.query<RowDataPacket[]>(sqlQuery, [
				`%${search}%`,
			]);
			const products: Product[] = Product.convertMany(results);
			console.log("ProductModel#findBySearch: success");
			return products;
		} catch (e) {
			console.log("ProductModel#findBySearch: error occurred");
			console.log(e);
			return null;
		}
	}

	static async findOne(id: number): Promise<Product | null> {
		if (isInValid([id])) {
			console.log("ProductModel#findOne: invalid params");
			return null;
		}
		const sqlQuery = "SELECT * FROM `product` WHERE `id` = ?";
		try {
			const [results, fields] = await pool.query<RowDataPacket[]>(sqlQuery, [
				id,
			]);
			if (results.length === 0) {
				console.log("ProductModel#findOne: no row matched with passed id");
				return null;
			}
			const row = results[0];
			const product: Product = Product.convert(row);
			console.log("ProductModel#findOne: success");
			return product;
		} catch (e) {
			console.log("ProductModel#findOne: error occurred");
			console.log(e);
			return null;
		}
	}
}

export class Product {
	id: number;
	sellerId: number;
	name: string;
	des: string;
	price: string;
	image: string;

	static convert(row: RowDataPacket): Product {
		const product = new Product(
			row["id"],
			row["seller_id"],
			row["name"],
			row["des"],
			row["price"],
			row["image"]
		);
		return product;
	}

	static convertMany(rows: RowDataPacket[]): Product[] {
		return rows.map((r) => this.convert(r));
	}

	constructor(
		id: number,
		sellerId: number,
		name: string,
		des: string,
		price: string,
		image: string
	) {
		this.id = id;
		this.sellerId = sellerId;
		this.name = name;
		this.des = des;
		this.price = price;
		this.image = image;
	}
}
