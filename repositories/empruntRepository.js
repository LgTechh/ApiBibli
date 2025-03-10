import { openDb } from '../config/db.js';

export const empruntRepository = {
    getAllEmprunt: async () => {
        const db = await openDb();
        try {
            const emprunts = await db.all('SELECT * FROM EMPRUNT');
            return emprunts;
        } catch (error) {
            throw new Error('Erreur lors de la récupération des livres');
        }
    },


    createEmprunt: async (empruntData) => {
        const db = await openDb();
        try {
            const { ID_Emprunt, ID_Membre, ID_Exemplaire, Date_Emprunt, Date_Retour_Prevue, Date_Retour_Effective } = empruntData;

            const result = await db.run(
                `INSERT INTO EMPRUNT (ID_Emprunt, ID_Membre, ID_Exemplaire, Date_Emprunt, Date_Retour_Prevue, Date_Retour_Effective)
                VALUES (?, ?, ?, ?, ?, ?)`,
                [ID_Emprunt, ID_Membre, ID_Exemplaire, Date_Emprunt, Date_Retour_Prevue, Date_Retour_Effective]
            );

            return {
                ID_Emprunt: result.lastID,
                ...empruntData
            };
        } catch (error) {
            throw new Error('Erreur lors de la création du livre');
        }
    },

    getEmpruntById: async (id) => {
        const db = await openDb();
        try {
            const emprunt = await db.get('SELECT * FROM EMPRUNT WHERE ID_Emprunt = ?', [id]);
            if (!emprunt) {
                throw new Error('Livre non trouvé');
            }
            return emprunt;
        } catch (error) {
            throw new Error('Erreur lors de la récupération du livre');
        }
    },

    updateEmprunt: async (id, empruntData) => {
        const db = await openDb();
        try {
            const { ID_Emprunt, ID_Membre, ID_Exemplaire, Date_Emprunt, Date_Retour_Prevue, Date_Retour_Effective } = empruntData;

            const result = await db.run(
                `UPDATE EMPRUNT 
                 SET ID_Emprunt = ?, ID_Membre = ?, ID_Exemplaire = ?, Date_Emprunt = ?, Date_Retour_Prevue = ?, Date_Retour_Effective = ?
                 WHERE ID_Emprunt = ?`,
                 [ID_Emprunt, ID_Membre, ID_Exemplaire, Date_Emprunt, Date_Retour_Prevue, Date_Retour_Effective, id]
            );

            if (result.changes === 0) {
                throw new Error('Livre non trouvé ou aucune modification effectuée');
            }
            return { ...empruntData, ID_Emprunt: id }; // crée un nouvel objet en combinant les deux
        } catch (error) {
            throw new Error('Erreur lors de la mise à jour du livre');
        }
    },

    deleteEmprunt: async (id) => {
        const db = await openDb();
        try {
            const result = await db.run('DELETE FROM EMPRUNT WHERE ID_Emprunt = ?', [id]);

            if (result.changes === 0) {
                throw new Error('Livre non trouvé');
            }
            return { message: 'Livre supprimé avec succès' };
        } catch (error) {
            throw new Error('Erreur lors de la suppression du livre');
        }
    }
};
