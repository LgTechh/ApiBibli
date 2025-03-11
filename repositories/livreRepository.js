import { openDb } from '../config/db.js';
import { creerLivre } from '../models/Livre.js';

export const livreRepository = {
    getAllLivres: async (limit, offset) => {
        const db = await openDb();
        try {
            let livresData;
            if (limit) {
                livresData = await db.all(`SELECT *
                                           FROM LIVRE LIMIT ?
                                           OFFSET ?`, [limit, offset]);
            } else {
                livresData = await db.all(`SELECT *
                                           FROM LIVRE`);
            }

            // Transformer les données brutes en utilisant le modèle
            const livres = livresData.map(livre => creerLivre(
                livre.ID_Livre,
                livre.ID_auteur,
                livre.ID_categorie,
                livre.Titre,
                livre.ISBN,
                livre.Annee_Publication,
                livre.Nb_page,
                livre.ID_editeur
            ));

            return livres;
        } catch (error) {
            throw new Error('Erreur lors de la récupération des livres');
        }
    },

    getLivresByCategorie: async (categorieId) => {
        const db = await openDb();
        try {
            const numericCategorieId = Number(categorieId);
            const livresData = await db.all(`SELECT LIVRE.ID_Livre,
                                                    LIVRE.ID_auteur,
                                                    LIVRE.ID_categorie,
                                                    LIVRE.Titre,
                                                    LIVRE.ISBN,
                                                    LIVRE.Annee_Publication,
                                                    LIVRE.Nb_page,
                                                    LIVRE.ID_editeur,
                                                    CATEGORIE.Nom,
                                                    CATEGORIE.Description
                                             FROM LIVRE
                                                      JOIN LIVRE_CATEGORIE ON LIVRE_CATEGORIE.ID_Livre = LIVRE.ID_Livre
                                                      JOIN CATEGORIE ON CATEGORIE.ID_categorie = LIVRE_CATEGORIE.ID_categorie
                                             WHERE LIVRE_CATEGORIE.ID_categorie = ?`, [numericCategorieId]);

            // On retourne un format enrichi avec les infos de catégorie
            return livresData.map(livre => ({
                ...creerLivre(
                    livre.ID_Livre,
                    livre.ID_auteur,
                    livre.ID_categorie,
                    livre.Titre,
                    livre.ISBN,
                    livre.Annee_Publication,
                    livre.Nb_page,
                    livre.ID_editeur
                ),
                categorie: {
                    nom: livre.Nom,
                    description: livre.Description
                }
            }));
        } catch (error) {
            throw new Error("Erreur lors de la récupération des livres par catégories")
        }
    },

    getLivreByAuteur: async (auteurId) => {
        const db = await openDb();
        try {
            const numericAuteurId = Number(auteurId);
            console.log("Requête SQL pour l'auteur avec ID :", numericAuteurId);
            const livresData = await db.all(`SELECT LIVRE.ID_Livre,
                                                    LIVRE.ID_auteur,
                                                    LIVRE.ID_categorie,
                                                    LIVRE.Titre,
                                                    LIVRE.ISBN,
                                                    LIVRE.Annee_Publication,
                                                    LIVRE.Nb_page,
                                                    LIVRE.ID_editeur,
                                                    AUTEUR.Nom,
                                                    AUTEUR.Prenom
                                             FROM AUTEUR
                                                      JOIN AUTEUR_Livre ON AUTEUR_Livre.ID_auteur = AUTEUR.ID_auteur
                                                      JOIN LIVRE ON AUTEUR_Livre.ID_Livre = LIVRE.ID_Livre
                                             WHERE AUTEUR.ID_auteur = ?`, [numericAuteurId]);

            console.log("Type de résultat:", typeof livresData);
            console.log("Est un tableau:", Array.isArray(livresData));
            console.log("Nombre d'éléments:", livresData ? (Array.isArray(livresData) ? livresData.length : 1) : 0);

            // On retourne un format enrichi avec les infos d'auteur
            return livresData.map(livre => ({
                ...creerLivre(
                    livre.ID_Livre,
                    livre.ID_auteur,
                    livre.ID_categorie,
                    livre.Titre,
                    livre.ISBN,
                    livre.Annee_Publication,
                    livre.Nb_page,
                    livre.ID_editeur
                ),
                auteur: {
                    nom: livre.Nom,
                    prenom: livre.Prenom
                }
            }));
        } catch (error) {
            throw new Error("Erreur lors de la récupération des livres par l'auteur");
        }
    },

    createLivre: async (livreData) => {
        const db = await openDb();
        try {
            const {ID_auteur, ID_categorie, Titre, ISBN, Annee_Publication, Nb_page, ID_editeur} = livreData;

            const result = await db.run(
                `INSERT INTO LIVRE (ID_auteur, ID_categorie, Titre, ISBN, Annee_Publication, Nb_page, ID_editeur)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [ID_auteur, ID_categorie, Titre, ISBN, Annee_Publication, Nb_page, ID_editeur]
            );

            // Retourner un livre correctement formaté
            return creerLivre(
                result.lastID,
                ID_auteur,
                ID_categorie,
                Titre,
                ISBN,
                Annee_Publication,
                Nb_page,
                ID_editeur
            );
        } catch (error) {
            throw new Error('Erreur lors de la création du livre');
        }
    },

    getLivreById: async (id) => {
        const db = await openDb();
        try {
            const livreData = await db.get('SELECT * FROM LIVRE WHERE ID_Livre = ?', [id]);
            if (!livreData) {
                throw new Error('Livre non trouvé');
            }

            // Retourner un livre correctement formaté
            return creerLivre(
                livreData.ID_Livre,
                livreData.ID_auteur,
                livreData.ID_categorie,
                livreData.Titre,
                livreData.ISBN,
                livreData.Annee_Publication,
                livreData.Nb_page,
                livreData.ID_editeur
            );
        } catch (error) {
            throw new Error('Erreur lors de la récupération du livre' + error.message);
        }
    },

    updateLivre: async (id, livreData) => {
        const db = await openDb();
        try {
            const {ID_auteur, ID_categorie, Titre, ISBN, Annee_Publication, Nb_page, ID_editeur} = livreData;

            const result = await db.run(
                `UPDATE LIVRE
                 SET ID_auteur = ?,
                     ID_categorie = ?,
                     Titre = ?,
                     ISBN = ?,
                     Annee_Publication = ?,
                     Nb_page = ?,
                     ID_editeur = ?
                 WHERE ID_Livre = ?`,
                [ID_auteur, ID_categorie, Titre, ISBN, Annee_Publication, Nb_page, ID_editeur, id]
            );

            if (result.changes === 0) {
                throw new Error('Livre non trouvé ou aucune modification effectuée');
            }

            // Retourner un livre correctement formaté
            return creerLivre(
                id,
                ID_auteur,
                ID_categorie,
                Titre,
                ISBN,
                Annee_Publication,
                Nb_page,
                ID_editeur
            );
        } catch (error) {
            throw new Error('Erreur lors de la mise à jour du livre');
        }
    },

    deleteLivre: async (id) => {
        const db = await openDb();
        try {
            const result = await db.run('DELETE FROM LIVRE WHERE ID_Livre = ?', [id]);

            if (result.changes === 0) {
                throw new Error('Livre non trouvé');
            }
            return {message: 'Livre supprimé avec succès'};
        } catch (error) {
            throw new Error('Erreur lors de la suppression du livre');
        }
    }
};