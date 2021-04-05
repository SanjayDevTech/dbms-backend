import express from "express";
import { User, UserModel } from "../../models/user.model.js";
import { isInValid } from "../../utils.js";
import bcrypt from "bcrypt";
import md5 from "md5";
import { SellerModel, Seller } from "../../models/seller.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
	try {
		const { mode, type, email, pwd } = req.body;
		if (isInValid([mode, type, email, pwd])) {
			return res.json({ error: "Invalid params" });
		}
		if (type === "user") {
			const user = await UserModel.findByEmail(email);
			if (mode === "login") {
				if (user === null) {
					return res.json({ error: "User account does not exist" });
				}
				if (await bcrypt.compare(pwd, user.pwd)) {
					return res.json({
						email: user.email,
						hash: user.hash,
						type: "user",
						error: null,
					});
				}
				return res.json({ error: "Wrong email or password" });
			} else {
				if (user !== null) {
					return res.json({ error: "User account already exists" });
				}
				const hashedPwd = await bcrypt.hash(pwd, 10);
				const hashValue = md5(hashedPwd);
				const userId = await UserModel.create(
					new User(0, email, hashedPwd, hashValue)
				);
				if (userId === 0) {
					return res.json({ error: "Unknown error" });
				}
				const newUser = await UserModel.findOne(userId);
				if (newUser === null) {
					return res.json({ error: "Can't fetch new credentials" });
				}
				return res.json({
					email: newUser.email,
					hash: newUser.hash,
					type: "user",
					error: null,
				});
			}
		} else {
			const seller = await SellerModel.findByEmail(email);
			if (mode === "login") {
				if (seller === null) {
					return res.json({ error: "Seller account does not exist" });
				}
				if (await bcrypt.compare(pwd, seller.pwd)) {
					return res.json({
						email: seller.email,
						hash: seller.hash,
						type: "seller",
						error: null,
					});
				}
				return res.json({ error: "Wrong email or password" });
			} else {
				if (seller !== null) {
					return res.json({ error: "Seller account already exists" });
				}
				const hashedPwd = await bcrypt.hash(pwd, 10);
				const hashValue = md5(hashedPwd);
				const sellerId = await SellerModel.create(
					new Seller(0, email, hashedPwd, hashValue)
				);
				if (sellerId === 0) {
					return res.json({ error: "Unknown error" });
				}
				const newSeller = await SellerModel.findOne(sellerId);
				if (newSeller === null) {
					return res.json({ error: "Can't fetch new credentials" });
				}
				return res.json({
					email: newSeller.email,
					hash: newSeller.hash,
					type: "seller",
					error: null,
				});
			}
		}
	} catch (e) {
		console.log(e.message);
		return res.json({ error: "Something bad happened : (" });
	}
});

export default router;
