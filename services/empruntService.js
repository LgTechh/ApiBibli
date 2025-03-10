import { empruntRepository } from '../repositories/empruntRepository.js';

export const empruntService = {
    getAllEmprunt: async () => {
        try {
            const emprunts = await empruntRepository.getAllEmprunt();
            return emprunts;
        } catch (error) {
            throw new Error('Erreur lors de la récupération des livres: ' + error.message);
        }
    },

    createEmprunt: async (empruntData) => {
        if (!empruntData.ID_Emprunt || !empruntData.ID_Membre || !empruntData.ID_Exemplaire || !empruntData.Date_Emprunt) {
            throw new Error("Les valeurs d'emprunt, ne sont pas défini correctement");
        }
        try {
            const createdEmprunt = await empruntRepository.createEmprunt(empruntData);
            return createdEmprunt;
        } catch (error) {
            throw new Error('Erreur lors de la création du livre: ' + error.message);
        }
    },

    getEmpruntById: async (id) => {
        try {
            const emprunt = await empruntRepository.getEmpruntById(id);
            return emprunt;
        } catch (error) {
            throw new Error('Erreur lors de la récupération du livre: ' + error.message);
        }
    },

    updateEmprunt: async (id, empruntData) => {
        // Logique de validation des données avant mise à jour
        if (!empruntData.ID_Membre || !empruntData.ID_Exemplaire || !empruntData.ID_Emprunt) {
            throw new Error('Les ID sont obligatoire');
        }

        try {
            const updatedEmprunt = await empruntRepository.updateEmprunt(id, empruntData);
            return updatedEmprunt;
        } catch (error) {
            throw new Error('Erreur lors de la mise à jour du livre: ' + error.message);
        }
    },

    deleteEmprunt: async (id) => {
        try {
            const result1 = await empruntRepository.deleteEmprunt(id);
            return result1;
        } catch (error) {
            throw new Error('Erreur lors de la suppression du livre: ' + error.message);
        }
    }
};
