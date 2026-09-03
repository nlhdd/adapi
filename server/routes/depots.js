import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
	const idDepot = Number(req.params.id);

	if (Number.isNaN(idDepot)) {
		return res.status(400).json({ error: "Id invalide" });
	}

	const { rows } = await pool.query(
		`SELECT depot.*, objet.libelle AS objet, personne.nom AS donatrice
		FROM depot
		JOIN objet     ON objet.depot_id = depot.id
		JOIN personne  ON personne.id  = depot.personne_id
		WHERE depot.id = $1`,
		[idDepot]
	);
	if (rows.length === 0) {
		return res.status(404).json({ error: "Dépôt introuvable" });
	}
	res.json(rows);

});


router.post("/", async (req, res) => {
	const { personne_id, date_depot, type } = req.body;

	if (!personne_id || !date_depot || !type) {
		return res.status(400).json({ erreur: "Champs obligatoires manquants" });
	}

	try {
		const { rows } = await pool.query(
			`INSERT INTO depot (personne_id, date_depot, type)
			 VALUES ($1, $2, $3)
			 RETURNING *`,
			[personne_id, date_depot, type]
		);
		res.status(201).json(rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({ erreur: "Erreur serveur" });
	}
});

router.post("/:id/objets", async (req, res) => {
	const { id } = req.params;
	const { libelle, poids_kg, etat_arrivee, categorie_id } = req.body;


	if (!libelle || !poids_kg || !etat_arrivee || !categorie_id) {
		return res.status(400).json({ erreur: "Champs obligatoires manquants" });
	}

	try {
		const { rows } = await pool.query(
			`INSERT INTO objet (libelle, poids_kg, etat_arrivee, categorie_id, depot_id)
			VALUES ($1, $2, $3, $4, $5)
			RETURNING *`,
			[libelle, poids_kg, etat_arrivee, categorie_id, id]
		);
		res.status(201).json(rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({ erreur: "Erreur serveur" });
	}
});

export default router;