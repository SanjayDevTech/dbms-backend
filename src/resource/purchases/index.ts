import express from "express";
import { UserModel } from "../../models/user.model.js";
import { Purchase, PurchaseModel } from "../../models/purchase.model.js";
import { isInValid } from "../../utils.js";

const router = express.Router();

router.post("/get", async (req, res) => {
	try {
		const { hash, email }: { hash: string; email: string } = req.body;
		if (!hash || !email) {
			return res.json({
				status: false,
				error: "Invalid params",
				purchases: [],
			});
		}
		const user = await UserModel.findByCredentials(email, hash);
		if (user === null)
			return res.json({
				status: false,
				error: "Invalid credential",
				purchases: [],
			});
		const purchases = await PurchaseModel.findMany(user.id);
		return res.json({ status: true, error: null, purchases: purchases || [] });
	} catch (e) {
		console.log(e.message);
		return res.json({ status: false, error: "Errorrr" });
	}
});

router.post("/", async (req, res) => {
	try {
		const {
			hash,
			purchase,
			email,
		}: { hash: string; purchase: Purchase; email: string } = req.body;
		if (isInValid([hash, purchase, email])) {
			return res.json({ status: false, error: "Invalid params" });
		}
		const user = await UserModel.findByCredentials(email, hash);
		if (user === null) {
			return res.json({ status: false, error: "No user found" });
		}
		if (user.hash !== hash) {
			return res.json({ status: false, error: "Invalid user id" });
		}
		purchase.userId = user.id;
		purchase.status = 0;
		const insertId = await PurchaseModel.create(purchase);
		if (insertId === 0) {
			return res.json({ status: false, error: "Posting purchase is failed" });
		}
		return res.json({ status: true, error: null });
	} catch (e) {
		console.log(e.message);
		return res.json({ status: false, error: "Errorrr" });
	}
});

export default router;
