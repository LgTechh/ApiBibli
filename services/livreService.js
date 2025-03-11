import { livreRepository } from '../repositories/livreRepository.js';

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
        if (!livreData.Titre || livreData.Titre.trim() === '') {
            throw new Error('Le titre du livre est obligatoire');
        }

        try {
           return await livreRepository.createLivre(livreData);
        } catch (error) {
            throw new Error('Erreur lors de la création du livre: ' + error.message);
        }
    },

    getLivreById: async (id) => {
        try {
            return await livreRepository.getLivreById(id);
        } catch (error) {
            throw new Error('Erreur lors de la récupération du livre: ' + error.message);
        }
    },

    updateLivre: async (id, livreData) => {
        // Logique de validation des données avant mise à jour
        if (!livreData.Titre || livreData.Titre.trim() === '') {
            throw new Error('Le titre du livre est obligatoire');
        }

        try {
            return await livreRepository.updateLivre(id, livreData);
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
