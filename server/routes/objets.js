import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// router.get("/", async (req, res) => {
// 	const { rows } = await pool.query(`SELECT * FROM objet ORDER BY id`);
// 	res.json(rows);
// });

///api/objets?statut=&categorie_id= 

router.get("/", async (req, res) => {
	const { statut, categorie_id } = req.query

	const { rows } = await pool.query(
		`SELECT objet.libelle, objet.poids_kg, objet.etat_arrivee, objet.statut, objet.prix, objet.date_mise_rayon, 
		objet.categorie_id, objet.depot_id, 
		objet.vente_id, objet.prix_paye, categorie.libelle AS categorie 
		FROM objet 
		JOIN categorie ON categorie.id = objet.categorie_id 
		WHERE objet.statut = COALESCE($1, objet.statut)
		AND objet.categorie_id = COALESCE($2, objet.categorie_id) 
		ORDER BY objet.id`,
		[statut, categorie_id]
	);
	res.json(rows);
});


router.get("/:id", async (req, res) => {
	const idObjet = Number(req.params.id);
	const { rows } = await pool.query(
		`SELECT objet.*, categorie.libelle AS categorie, depot.type AS depot, personne.nom AS donatrice
		FROM objet
		JOIN categorie ON categorie.id = objet.categorie_id
		JOIN depot     ON depot.id     = objet.depot_id
		JOIN personne  ON personne.id  = depot.personne_id
		WHERE objet.id = $1`,
		[idObjet]
	);

	if (rows.length === 0) {
		return res.status(404).json({ error: "Objet introuvable" });
	}

	res.json(rows[0]);
});

router.post("/", async (req, res) => {
	const { libelle, poids_kg, etat_arrivee, categorie_id, depot_id } = req.body;

	const { rows } = await pool.query(
		`INSERT INTO objet (libelle, poids_kg, etat_arrivee, categorie_id, depot_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
		[libelle, Number(poids_kg), etat_arrivee, Number(categorie_id), Number(depot_id)]
	);

	res.status(201).json(rows[0]);
});



export default router;