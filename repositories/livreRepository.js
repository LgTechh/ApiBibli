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
    }
};
