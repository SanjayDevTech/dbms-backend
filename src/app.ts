import express from "express";

const app = express();
const PORT = 7000;

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at *:${PORT}`);
});
