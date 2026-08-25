import express from "express";

const app = express();

app.get("/", (req, res) => {
	res.send("Bienvenue sur l'API de La Remise");
})

app.listen(3000, () => {
	console.log("Serveur sur http://localhost:3000");
});