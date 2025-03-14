import { auteurRepository } from '../repositories/auteurRepository.js';
import {creerAuteur, validerAuteur} from "../models/Auteur.js";

export const auteurService = {
    getAllAuteur: async () => {
        try {
            return await auteurRepository.getAllAuteur();
        } catch (error) {
            throw new Error("Erreur lors de la récupération des auteurs:" + error.message);
        }
    },

    createAuteur: async (auteurData) => {
        const validationAuteur = validerAuteur(auteurData);
        if (!validationAuteur.estValide) {
            throw new Error("Les valeurs de l'auteur ne sont pas définies correctement");
        }
        try {
            const newAuteur = await auteurRepository.createAuteur(auteurData);
            return creerAuteur(
                newAuteur.ID_auteur,
                newAuteur.Nom,
                newAuteur.Prenom,
                newAuteur.Nationalité,
                newAuteur.Jour_de_naissance,
                newAuteur.Mois_de_naissance,
                newAuteur.Annee_de_naissance
            )
        } catch (error) {
            throw new Error("Erreur lors de la création de l'auteur:" + error.message);
        }
    },

    getAuteurById: async (id) => {
        try {
            const auteur = await auteurRepository.getAuteurById(id);
            return creerAuteur(
                auteur.ID_auteur,
                auteur.Nom,
                auteur.Prenom,
                auteur.Nationalité,
                auteur.Jour_de_naissance,
                auteur.Mois_de_naissance,
                auteur.Annee_de_naissance
            );
        } catch (error) {
            throw new Error("Erreur lors de la récupération de l'auteur:"  + error.message);
        }
    },

    updateAuteur: async (id, auteurData) => {
        const validationAuteur = validerAuteur(auteurData);
         if (!validationAuteur.estValide) {
            throw new Error("Des informations sont obligatoires");
        }

        try {
            const updatedAuteur = await auteurRepository.updateAuteur(id, auteurData);
            if (!updatedAuteur) {
                throw new Error("Aucun auteur trouvé avec cet ID");
            }
            return creerAuteur(
                updatedAuteur.ID_auteur,
                updatedAuteur.Nom,
                updatedAuteur.Prenom,
                updatedAuteur.Nationalité,
                updatedAuteur.Jour_de_naissance,
                updatedAuteur.Mois_de_naissance,
                updatedAuteur.Annee_de_naissance
            );
        } catch (error) {
            throw new Error("Erreur lors de la mise à jour de l'auteur: " + error.message);
        }
    },

    deleteAuteur: async (id) => {
        try {
            return await auteurRepository.deleteAuteur(id);
        } catch (error) {
            throw new Error("Erreur lors de la suppression de l'auteur: ' + error.message");
        }
    }
};
