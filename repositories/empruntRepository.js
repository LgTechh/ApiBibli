import { openDb } from '../config/db.js';
import {creerEmprunt} from "../models/Emprunt.js";

export const empruntRepository = {
    getAllEmprunt: async () => {
        const db = await openDb();
        try {
            const empruntData = await db.all('SELECT * FROM EMPRUNT');
            return empruntData.map(emprunt => creerEmprunt(
                emprunt.ID_Emprunt,
                emprunt.ID_Membre,
                emprunt.ID_Exemplaire,
                emprunt.Date_Emprunt,
                emprunt.Date_Retour_Prevue,
                emprunt.Date_Retour_Effective
            ));
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

            return creerEmprunt(
                result.lastID,
                ID_Emprunt,
                ID_Membre,
                ID_Exemplaire,
                Date_Emprunt,
                Date_Retour_Prevue,
                Date_Retour_Effective
            );
        } catch (error) {
            throw new Error("Erreur lors de la création du l'emprunt");
        }
    },

    getEmpruntById: async (id) => {
        const db = await openDb();
        try {
            const empruntData = await db.get('SELECT * FROM EMPRUNT WHERE ID_Emprunt = ?', [id]);
            if (!empruntData) {
                throw new Error('Livre non trouvé');
            }
            return creerEmprunt(
                empruntData.ID_Emprunt,
                empruntData.ID_Membre,
                empruntData.ID_Exemplaire,
                empruntData.Date_Emprunt,
                empruntData.Date_Retour_Prevue,
                empruntData.Date_Retour_Effective
            )
        } catch (error) {
            throw error;
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
            return creerEmprunt(
                ID_Emprunt,
                ID_Membre,
                ID_Exemplaire,
                Date_Emprunt,
                Date_Retour_Prevue,
                Date_Retour_Effective
            );
        } catch (error) {
            throw new Error('Erreur lors de la mise à jour du livre');
        }
    },

    deleteEmprunt: async (id) => {
        const db = await openDb();
        try {
            const result = await db.run('DELETE FROM EMPRUNT WHERE ID_Emprunt = ?', [id]);

            if (result.changes === 0) {
                throw new Error('emprunt non trouvé');
            }
            return { message: 'emprunt supprimé avec succès' };
        } catch (error) {
            throw new Error("Erreur lors de la suppression de l'emprunt");
        }
    }
};
