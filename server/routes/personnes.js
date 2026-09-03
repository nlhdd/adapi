import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
	const { nom, prenom, telephone, adherente } = req.body;

	if (!nom || !prenom) {
		return res.status(400).json({ erreur: "Champs obligatoires manquants" });
	}

	try {
		const { rows } = await pool.query(
			`INSERT INTO personne (nom, prenom, telephone, adherente)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
			[nom, prenom, telephone, adherente]
		);
		res.status(201).json(rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({ erreur: "Erreur serveur" });
	}
});

export default router;