import express from "express";

const app = express();

app.get("/", (req, res) => {
	res.send("Bienvenue sur l'API de La Remise");
});

app.get("/api/categories", (req, res) => {
	res.json({ id: 3, libelle: "Livres" });
});

app.get("/api/objets", (req, res) => {
	res.json([{ id: 3, libelle: "Bouilloire", categorie_id: 2 }, { id: 11, libelle: "Chaise en bois", categorie_id: 1 }]);
});


app.listen(3000, () => {
	console.log("Serveur sur http://localhost:3000");
});