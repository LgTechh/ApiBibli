import { livreRepository } from '../repositories/livreRepository.js';

export const livreService = {
    getAllLivres: async () => {
        try {
            const livres = await livreRepository.getAllLivres();
            return livres;
        } catch (error) {
            throw new Error('Erreur lors de la récupération des livres: ' + error.message);
        }
    },

    getLivresByCategorie: async (categorieId) => {
        try {
            const livrecat = await livreRepository.getLivresByCategorie(categorieId);
            return livrecat;
        } catch (error) {
            throw new Error('Erreur lors de la récupération des livres: ' + error.message);
        }
    },

    getLivreByAuteur: async (auteurId) => {
        try {
            const livreAut = await livreRepository.getLivreByAuteur(auteurId);
            return livreAut;
        } catch (error) {
            throw new Error('Erreur lors de la récupéation des livres:' + error.message);
        }
    },

    createLivre: async (livreData) => {
        if (!livreData.Titre || livreData.Titre.trim() === '') {
            throw new Error('Le titre du livre est obligatoire');
        }

        try {
            const createdLivre = await livreRepository.createLivre(livreData);
            return createdLivre;
        } catch (error) {
            throw new Error('Erreur lors de la création du livre: ' + error.message);
        }
    },

    getLivreById: async (id) => {
        try {
            const livre = await livreRepository.getLivreById(id);
            return livre;
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
            const updatedLivre = await livreRepository.updateLivre(id, livreData);
            return updatedLivre;
        } catch (error) {
            throw new Error('Erreur lors de la mise à jour du livre: ' + error.message);
        }
    },

    deleteLivre: async (id) => {
        try {
            const result = await livreRepository.deleteLivre(id);
            return result;
        } catch (error) {
            throw new Error('Erreur lors de la suppression du livre: ' + error.message);
        }
    }
};
