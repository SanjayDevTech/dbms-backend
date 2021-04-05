import express from "express";
import { isInValid } from "../../utils.js";
import { Product, ProductModel } from "../../models/product.model.js";
import { SellerModel } from "../../models/seller.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const query = String(req.query.query || "");
		console.log("Query:", query || "");
		const products = await ProductModel.findBySearch(query);
		return res.json(products || []);
	} catch (e) {
		console.log(e.message);
		return res.json([]);
	}
});

router.post("/", async (req, res) => {
	try {
		const {
			hash,
			product,
			email,
		}: { hash: string; product: Product; email: string } = req.body;
		if (isInValid([hash, product, email])) {
			return res.json({ status: false, error: "Invalid params" });
		}
		const seller = await SellerModel.findByCredentials(email, hash);
		if (seller === null) {
			return res.json({ status: false, error: "No seller found" });
		}
		if (seller.hash !== hash) {
			return res.json({ status: false, error: "Invalid seller id" });
		}
		product.sellerId = seller.id;
		const insertId = await ProductModel.create(product);
		if (insertId === 0) {
			return res.json({ status: false, error: "Posting product is failed" });
		}
		return res.json({ status: true, error: null });
	} catch (e) {
		console.log(e.message);
		return res.json({ status: false, error: "Something bad happened : (" });
	}
});

router.put("/", async (req, res) => {
	try {
		const {
			hash,
			product,
			email,
		}: { hash: string; product: Product; email: string } = req.body;
		if (isInValid([hash, product, email])) {
			return res.json({ status: false, error: "Invalid params" });
		}
		const seller = await SellerModel.findByCredentials(email, hash);
		if (seller === null) {
			return res.json({ status: false, error: "No seller found" });
		}
		if (seller.hash !== hash) {
			return res.json({ status: false, error: "Invalid seller id" });
		}
		product.sellerId = seller.id;
		const updatedRows = await ProductModel.update(product);
		return res.json({ status: true, error: null });
	} catch (e) {
		console.log(e.message);
		return res.json({ status: false, error: "Something bad happened : (" });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const id = Number(req.params.id);
		const { hash, email } = req.body;
		if (!id) {
			return res.json({ status: false, error: "Invalid id" });
		}
		if (isInValid([hash, email])) {
			return res.json({ status: false, error: "Invalid params" });
		}
		const product = await ProductModel.findOne(id);
		if (product === null) {
			return res.json({ status: false, error: "Product is not exist" });
		}
		const seller = await SellerModel.findByCredentials(email, hash);
		if (seller === null) {
			return res.json({ status: false, error: "No seller found" });
		}
		if (seller.hash !== hash) {
			return res.json({ status: false, error: "Invalid seller id" });
		}
		const affectedRows = await ProductModel.delete(id);
		return res.json({ status: true, error: null });
	} catch (e) {
		console.log(e.message);
		return res.json({ status: false, error: "Something bad happened : (" });
	}
});

export default router;
