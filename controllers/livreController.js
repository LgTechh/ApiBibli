import { livreService } from '../services/livreService.js';

export const livreController = {
    getAllLivres: async (req, res) => {
        try {
            const livres = await livreService.getAllLivres();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(livres));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: error.message }));
        }
    },

    getLivresByCategorie: async(req,res, categorieId) => {
        try {
            const livrecat = await livreService.getLivresByCategorie(categorieId);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(livrecat));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: error.message }));
        }
    },

    getLivreByAuteur: async(req,res, auteurId) => {
        try {
            const livreaut = await livreService.getLivreByAuteur(auteurId);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(livreaut));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: error.message }));
        }
    },

    getLivreById: async (req, res, id) => {
        try {
            const livre = await livreService.getLivreById(id);
            if (!livre) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, error: 'Livre non trouvé' }));
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(livre));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: error.message }));
        }
    },

    createLivre: async (req, res, body) => {
        try {
            const newLivre = await livreService.createLivre(body);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newLivre));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: error.message }));
        }
    },

    updateLivre: async (req, res, id, body) => {
        try {
            const updatedLivre = await livreService.updateLivre(id, body);
            if (!updatedLivre) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, error: 'Livre non trouvé' }));
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedLivre));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: error.message }));
        }
    },

    deleteLivre: async (req, res, id) => {
        try {
            const deletedLivre = await livreService.deleteLivre(id);
            if (!deletedLivre) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, error: 'Livre non trouvé' }));
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'Livre supprimé' }));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: error.message }));
        }
    }
};
