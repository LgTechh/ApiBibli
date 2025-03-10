import { openDb } from '../config/db.js';

export const auteurRepository = {
    getAllAuteur: async () => {
        const db = await openDb();
        try {
            const auteurs = await db.all('SELECT * FROM AUTEUR');
            return auteurs;
        } catch (error) {
            throw new Error('Erreur lors de la récupération des auteurs');
        }
    },


    createAuteur: async (auteurData) => {
        const db = await openDb();
        try {
            const { ID_auteur, Nom, Prenom, Nationalité, Jour_de_naissance, Mois_de_naissance, Annee_de_naissance } = auteurData;

            const result = await db.run(
                `INSERT INTO AUTEUR (ID_auteur, Nom, Prenom, Nationalité, Jour_de_naissance, Mois_de_naissance, Annee_de_naissance)
                VALUES (?, ?, ?, ?, ?, ?,?)`,
                [ID_auteur, Nom, Prenom, Nationalité, Jour_de_naissance, Mois_de_naissance, Annee_de_naissance]
            );

            return {
                ID_auteur: result.lastID,
                ...auteurData
            };
        } catch (error) {
            throw new Error("Erreur lors de la création de l'auteur");
        }
    },

    getAuteurById: async (id) => {
        const db = await openDb();
        try {
            const auteur = await db.get('SELECT * FROM AUTEUR WHERE ID_auteur = ?', [id]);
            if (!auteur) {
                throw new Error('Auteur non trouvé');
            }
            return auteur;
        } catch (error) {
            throw new Error("Erreur lors de la récupération de l'auteur");
        }
    },

    updateAuteur: async (id, auteurData) => {
        const db = await openDb();
        try {
            const { ID_auteur, Nom, Prenom, Nationalité, Jour_de_naissance, Mois_de_naissance, Annee_de_naissance } = auteurData;

            const result = await db.run(
                `UPDATE AUTEUR 
                 SET ID_auteur = ?, Nom = ?, Prenom = ?, Nationalité = ?, Jour_de_naissance = ?, Mois_de_naissance = ?, Annee_de_naissance= ?
                 WHERE ID_auteur = ?`,
                [ID_auteur, Nom, Prenom, Nationalité, Jour_de_naissance, Mois_de_naissance, Annee_de_naissance, id]
            );

            if (result.changes === 0) {
                throw new Error('Auteur non trouvé ou aucune modification effectuée');
            }
            return { ...auteurData, ID_auteur: id }; // crée un nouvel objet en combinant les deux
        } catch (error) {
            throw new Error('Erreur lors de la mise à jour du livre');
        }
    },

    deleteAuteur: async (id) => {
        const db = await openDb();
        try {
            const result = await db.run('DELETE FROM AUTEUR WHERE ID_auteur = ?', [id]);

            if (result.changes === 0) {
                throw new Error('Auteur non trouvé');
            }
            return { message: 'Auteur supprimé avec succès' };
        } catch (error) {
            throw new Error('Erreur lors de la suppression du livre');
        }
    }
};
