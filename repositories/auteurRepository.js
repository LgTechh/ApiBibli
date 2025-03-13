import { openDb } from '../config/db.js';
import {creerAuteur} from "../models/Auteur.js";

export const auteurRepository = {
    getAllAuteur: async () => {
        const db = await openDb();
        try {
            const auteurData = await db.all(`SELECT * FROM AUTEUR`)
            const auteurs = auteurData.map(auteur => creerAuteur(
                auteur.ID_auteur,
                auteur.Nom,
                auteur.Prenom,
                auteur.Nationalité,
                auteur.Jour_de_naissance,
                auteur.Mois_de_naissance,
                auteur.Annee_de_naissance
            ));
            return auteurs
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
            return creerAuteur(
                result.lastID,
                ID_auteur,
                Nom,
                Prenom,
                Nationalité,
                Jour_de_naissance,
                Mois_de_naissance,
                Annee_de_naissance
            );
        } catch (error) {
            throw new Error("Erreur lors de la création de l'auteur");
        }
    },

    getAuteurById: async (id) => {
        const db = await openDb();
        try {
            const auteurData = await db.get('SELECT * FROM AUTEUR WHERE ID_auteur = ?', [id]);
            if (!auteurData) {
                throw new Error('Auteur non trouvé');
            }
            return creerAuteur(
                auteurData.ID_auteur,
                auteurData.Nom,
                auteurData.Prenom,
                auteurData.Nationalité,
                auteurData.Jour_de_naissance,
                auteurData.Mois_de_naissance,
                auteurData.Annee_de_naissance
            );
        } catch (error) {
            throw error;
        }
    },

    updateAuteur: async (id, auteurData) => {
        const db = await openDb();
        try {
            const { ID_auteur, Nom, Prenom, Nationalité, Jour_de_naissance, Mois_de_naissance, Annee_de_naissance } = auteurData;
            const auteurExist = await db.get('SELECT * FROM AUTEUR WHERE ID_auteur = ?', [id]);
            if (!auteurExist) {
                throw new Error('Auteur non trouvé');
            }


            const result = await db.run(
                `UPDATE AUTEUR 
             SET ID_auteur = ?, Nom = ?, Prenom = ?, Nationalité = ?, Jour_de_naissance = ?, Mois_de_naissance = ?, Annee_de_naissance = ?
             WHERE ID_auteur = ?`,
                [ID_auteur, Nom, Prenom, Nationalité, Jour_de_naissance, Mois_de_naissance, Annee_de_naissance, id]
            );

            console.log(result);
            if (result.changes === 0) {
                throw new Error('Auteur non trouvé ou aucune modification effectuée');
            }
            return creerAuteur(
                ID_auteur,
                Nom,
                Prenom,
                Nationalité,
                Jour_de_naissance,
                Mois_de_naissance,
                Annee_de_naissance
            );

        } catch (error) {
            console.log("Erreur dans la mise à jour de l'auteur", error);
            throw new Error("Erreur lors de la mise à jour de l'auteur");
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
