import { openDb } from '../config/db.js';

export const livreRepository = {
    getAllLivres: async () => {
        const db = await openDb();
        try {
            const livres = await db.all('SELECT * FROM LIVRE');
            return livres;
        } catch (error) {
            throw new Error('Erreur lors de la récupération des livres');
        }
    },

    getLivresByCategorie: async (categorieId) => {
        const db = await openDb();
        try {
            const numericCategorieId = Number(categorieId);
            const livrecat = await db.all(`SELECT LIVRE.Titre, CATEGORIE.Nom, CATEGORIE.Description
                FROM LIVRE
                JOIN LIVRE_CATEGORIE ON LIVRE_CATEGORIE.ID_Livre = LIVRE.ID_Livre
                JOIN CATEGORIE ON CATEGORIE.ID_categorie = LIVRE_CATEGORIE.ID_categorie
                WHERE LIVRE_CATEGORIE.ID_categorie = ?`, [numericCategorieId]);

            return livrecat;
        } catch (error) {
            throw new Error("Erreur lors de la récupération des livres par catégories")
        }
    },

    getLivreByAuteur: async (auteurId) => {
        const db = await openDb();
        try {
            const numericAuteurId = Number(auteurId);
            console.log("Requête SQL pour l'auteur avec ID :", numericAuteurId);
            const livreAut = await db.all(`SELECT AUTEUR.Nom, AUTEUR.Prenom, LIVRE.Titre
                FROM AUTEUR
                JOIN AUTEUR_Livre ON AUTEUR_Livre.ID_auteur = AUTEUR.ID_auteur
                JOIN LIVRE ON AUTEUR_Livre.ID_Livre = LIVRE.ID_Livre
                WHERE AUTEUR.ID_auteur = ?`, [numericAuteurId]);

            console.log("Type de résultat:", typeof livreAut);
            console.log("Est un tableau:", Array.isArray(livreAut));
            console.log("Nombre d'éléments:", livreAut ? (Array.isArray(livreAut) ? livreAut.length : 1) : 0);
            return livreAut;
        } catch (error) {
            throw new Error("Erreur lors de la récupération des livres par l'auteur");
        }
    },


    createLivre: async (livreData) => {
        const db = await openDb();
        try {
            const { ID_auteur, ID_categorie, Titre, ISBN, Annee_Publication, Nb_page, ID_editeur } = livreData;

            const result = await db.run(
                `INSERT INTO LIVRE (ID_auteur, ID_categorie, Titre, ISBN, Annee_Publication, Nb_page, ID_editeur)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [ID_auteur, ID_categorie, Titre, ISBN, Annee_Publication, Nb_page, ID_editeur]
            );

            return {
                ID_Livre: result.lastID,
                ...livreData
            };
        } catch (error) {
            throw new Error('Erreur lors de la création du livre');
        }
    },

    getLivreById: async (id) => {
        const db = await openDb();
        try {
            const livre = await db.get('SELECT * FROM LIVRE WHERE ID_Livre = ?', [id]);
            if (!livre) {
                throw new Error('Livre non trouvé');
            }
            return livre;
        } catch (error) {
            throw new Error('Erreur lors de la récupération du livre');
        }
    },

    updateLivre: async (id, livreData) => {
        const db = await openDb();
        try {
            const { ID_auteur, ID_categorie, Titre, ISBN, Annee_Publication, Nb_page, ID_editeur } = livreData;

            const result = await db.run(
                `UPDATE LIVRE 
                 SET ID_auteur = ?, ID_categorie = ?, Titre = ?, ISBN = ?, Annee_Publication = ?, Nb_page = ?, ID_editeur = ?
                 WHERE ID_Livre = ?`,
                [ID_auteur, ID_categorie, Titre, ISBN, Annee_Publication, Nb_page, ID_editeur, id]
            );

            if (result.changes === 0) {
                throw new Error('Livre non trouvé ou aucune modification effectuée');
            }
            return { ...livreData, ID_Livre: id };
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
            return { message: 'Livre supprimé avec succès' };
        } catch (error) {
            throw new Error('Erreur lors de la suppression du livre');
        }
    },

    getLivrePage: async (limit = 10, offset = 0) => {
        const db = await openDb();
        try {
            const pagination = await db.all(`SELECT * FROM LIVRES LIMIT ? OFFSET ?`, [limit, offset]);
            return pagination;
        } catch (error) {
            throw new Error('Erreur dans la récupération de la pagination')
        }
    }
};
