import { livreRepository } from '../repositories/livreRepository.js';
import { creerLivre, validerLivre} from "../models/Livre.js";

export const livreService = {
    getAllLivres: async (page = 1, limit = 10) => {
        try {
            const offset = (page - 1) * limit;
            const livres = await livreRepository.getAllLivres(limit, offset);
            const total = await livreRepository.getAllLivres();

            return {
                page,
                limit,
                total: total.length,
                livres
            };
        } catch (error) {
            throw new Error('Erreur lors de la récupération des livres: ' + error.message);
        }
    },

    getLivresByCategorie: async (categorieId) => {
        try {
            return await livreRepository.getLivresByCategorie(categorieId);
        } catch (error) {
            throw new Error('Erreur lors de la récupération des livres: ' + error.message);
        }
    },

    getLivreByAuteur: async (auteurId) => {
        try {
            return await livreRepository.getLivreByAuteur(auteurId);
        } catch (error) {
            throw new Error('Erreur lors de la récupéation des livres:' + error.message);
        }
    },

    createLivre: async (livreData) => {
        const validation = validerLivre(livreData);
        if (!validation.estValide) {
            throw new Error('Données de livre invalides: ' + validation.erreurs.join(', '));
        }

        try {
            const newLivre = await livreRepository.createLivre(livreData);
            return creerLivre(
                newLivre.ID_Livre,
                newLivre.ID_auteur,
                newLivre.ID_categorie,
                newLivre.Titre,
                newLivre.ISBN,
                newLivre.Annee_Publication,
                newLivre.Nb_page,
                newLivre.ID_editeur
            );
        } catch (error) {
            throw new Error('Erreur lors de la création du livre: ' + error.message);
        }
    },

    getLivreById: async (id) => {
        try {
            const livre = await livreRepository.getLivreById(id);
            return creerLivre(
                livre.ID_Livre,
                livre.ID_auteur,
                livre.ID_categorie,
                livre.Titre,
                livre.ISBN,
                livre.Annee_Publication,
                livre.Nb_page,
                livre.ID_editeur
            );
        } catch (error) {
            throw new Error('Erreur lors de la récupération du livre: ' + error.message);
        }
    },

    updateLivre: async (id, livreData) => {
        const validation = validerLivre(livreData);
        if (!validation.estValide) {
            throw new Error('Données de livre invalides: ' + validation.erreurs.join(', '));
        }

        try {
            const updatedLivre = await livreRepository.updateLivre(id, livreData);
            return creerLivre(
                updatedLivre.ID_Livre,
                updatedLivre.ID_auteur,
                updatedLivre.ID_categorie,
                updatedLivre.Titre,
                updatedLivre.ISBN,
                updatedLivre.Annee_Publication,
                updatedLivre.Nb_page,
                updatedLivre.ID_editeur
            );
        } catch (error) {
            throw new Error('Erreur lors de la mise à jour du livre: ' + error.message);
        }
    },

    deleteLivre: async (id) => {
        try {
            return await livreRepository.deleteLivre(id);
        } catch (error) {
            throw new Error('Erreur lors de la suppression du livre: ' + error.message);
        }
    }
};
