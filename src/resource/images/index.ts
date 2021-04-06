import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import __dirname from "../../../expose.js";
const router = express.Router();

console.log(__dirname);

const memory = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, __dirname + "/tmp");
	},
	filename: (req, file, cb) => {
		cb(
			null,
			file.fieldname + "-" + uuidv4() + "." + file.mimetype.split("/")[1]
		);
	},
});

const upload = multer({
	storage: memory,
	limits: { fieldSize: 10 * 1024 * 1024 },
});

router.post("/upload", upload.single("image"), (req, res) => {
	return res.json({
		status: true,
		error: null,
		image: req.file.filename,
	});
});

export default router;
