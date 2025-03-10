import { auteurRepository } from '../repositories/auteurRepository.js';

export const auteurService = {
    getAllAuteur: async () => {
        try {
            const auteurs = await auteurRepository.getAllAuteur();
            return auteurs;
        } catch (error) {
            throw new Error("Erreur lors de la récupération des auteurs:" + error.message);
        }
    },

    createAuteur: async (auteurData) => {
        if (!auteurData.ID_auteur || !auteurData.Nom || !auteurData.Prenom || !auteurData.Annee_de_naissance) {
            throw new Error("Les valeurs de l'auteur ne sont pas définies correctement");
        }
        try {
            const createdAuteur = await auteurRepository.createAuteur(auteurData);
            return createdAuteur;
        } catch (error) {
            throw new Error("Erreur lors de la création de l'auteur:" + error.message);
        }
    },

    getAuteurById: async (id) => {
        try {
            const auteur = await auteurRepository.getAuteurById(id);
            return auteur;
        } catch (error) {
            throw new Error("Erreur lors de la récupération de l'auteur:"  + error.message);
        }
    },

    updateAuteur: async (id, auteurData) => {
        if (!auteurData.ID_auteur || !auteurData.Nom || !auteurData.Prenom) {
            throw new Error("Les informations 'Nom' et 'Prenom' sont obligatoires");
        }

        try {
            const updatedAuteur = await auteurRepository.updateAuteur(id, auteurData);
            if (!updatedAuteur) {
                throw new Error("Aucun auteur trouvé avec cet ID");
            }
            return updatedAuteur;
        } catch (error) {
            throw new Error("Erreur lors de la mise à jour de l'auteur: " + error.message);
        }
    },

    deleteAuteur: async (id) => {
        try {
            const result = await auteurRepository.deleteAuteur(id);
            return result;
        } catch (error) {
            throw new Error("Erreur lors de la suppression de l'auteur: ' + error.message");
        }
    }
};
