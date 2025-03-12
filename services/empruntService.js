import { empruntRepository } from '../repositories/empruntRepository.js';
import {creerEmprunt, validerEmprunt} from "../models/Emprunt.js";

export const empruntService = {
    getAllEmprunt: async () => {
        try {
            return await empruntRepository.getAllEmprunt();
        } catch (error) {
            throw new Error('Erreur lors de la récupération des livres: ' + error.message);
        }
    },

    createEmprunt: async (empruntData) => {
        const validationEmprunt = validerEmprunt(empruntData);
        if (!validationEmprunt.estValide) {
            throw new Error("Les valeurs d'emprunt, ne sont pas défini correctement");
        }
        try {
            const newEmprunt = await empruntRepository.createEmprunt(empruntData);
            return creerEmprunt(
                newEmprunt.ID_Emprunt,
                newEmprunt.ID_Membre,
                newEmprunt.ID_Exemplaire,
                newEmprunt.Date_Emprunt,
                newEmprunt.Date_Retour_Prevue,
                newEmprunt.Date_Retour_Effective
            );
        } catch (error) {
            throw new Error('Erreur lors de la création du livre: ' + error.message);
        }
    },

    getEmpruntById: async (id) => {
        try {
            const emprunt = await empruntRepository.getEmpruntById(id);
            return creerEmprunt(
                emprunt.ID_Emprunt,
                emprunt.ID_Membre,
                emprunt.ID_Exemplaire,
                emprunt.Date_Emprunt,
                emprunt.Date_Retour_Prevue,
                emprunt.Date_Retour_Effective
            );
        } catch (error) {
            throw new Error('Erreur lors de la récupération du livre: ' + error.message);
        }
    },

    updateEmprunt: async (id, empruntData) => {
        const validationEmprunt = validerEmprunt(empruntData)
        if (!validationEmprunt.estValide) {
            throw new Error('Les ID sont obligatoire');
        }

        try {
            const updatedEmprunt = await empruntRepository.updateEmprunt(id, empruntData);
            return creerEmprunt(
                updatedEmprunt.ID_Emprunt,
                updatedEmprunt.ID_Membre,
                updatedEmprunt.ID_Exemplaire,
                updatedEmprunt.Date_Emprunt,
                updatedEmprunt.Date_Retour_Prevue,
                updatedEmprunt.Date_Retour_Effective
            );
        } catch (error) {
            throw new Error('Erreur lors de la mise à jour du livre: ' + error.message);
        }
    },

    deleteEmprunt: async (id) => {
        try {
            return await empruntRepository.deleteEmprunt(id);
        } catch (error) {
            throw new Error('Erreur lors de la suppression du livre: ' + error.message);
        }
    }
};
