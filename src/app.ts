import express from "express";

import authResource from "./resource/auth";
import productsResource from "./resource/products";
import purchasesResource from "./resource/purchases";

const app = express();
const PORT = 7000;

app.use("/auth", authResource);
app.use("/products", productsResource);
app.use("/purchases", purchasesResource);

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at *:${PORT}`);
});
