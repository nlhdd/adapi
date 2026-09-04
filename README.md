# Projet ADAPI

API de gestion d'une ressourcerie : suivi des dépôts, des objets, des donatrices.

## Stack

- Node.js / Express
- PostgreSQL (via `pg`)
- Swagger UI pour la documentation

## Lancement

```bash
# Développement (redémarrage auto avec nodemon)
npm run dev

Le serveur démarre sur `http://localhost:3000`.

## Documentation

La documentation interactive Swagger est disponible sur :

```
http://localhost:3000/api-docs
```

Chaque route peut y être testée directement via le bouton « Try it out ».

## Routes principales

| Méthode | Route                        | Description                                          |
| ------- | ---------------------------- | ---------------------------------------------------- |
| GET     | `/api/objets`                | Liste les objets (filtres `statut`, `categorie_id`)  |
| GET     | `/api/objets/:id`            | Détail d'un objet                                    |
| POST    | `/api/objets`                | Crée un objet                                        |
| PATCH   | `/api/objets/:id/statut`     | Met à jour le statut (et le prix) d'un objet         |
| GET     | `/api/depots/:id`            | Détail d'un dépôt                                    |
| POST    | `/api/depots`                | Enregistre un dépôt                                  |
| POST    | `/api/depots/:id/objets`     | Ajoute un objet à un dépôt                           |
| POST    | `/api/personnes`             | Crée une donatrice                                   |
| GET     | `/api/categories`            | Liste les catégories                                 |
| GET     | `/api/stats`                 | Objets par statut, poids total reçu, poids détourné  |
