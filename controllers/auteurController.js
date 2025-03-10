import { auteurService } from "../services/auteurService.js";

export const auteurController = {
    getAllAuteur: async (req, res) => {
        try {
            const auteurs = await auteurService.getAllAuteur();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(auteurs));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: error.message }));
        }
    },

    getAuteurById: async (req, res, id) => {
        try {
            const auteur = await auteurService.getAuteurById(id);
            if (!auteur) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, error: 'Auteur non trouvé' }));
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(auteur));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: error.message }));
        }
    },

    createAuteur: async (req, res, body) => {
        try {
            const newAuteur = await auteurService.createAuteur(body);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newAuteur));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: error.message }));
        }
    },

    updateAuteur: async (req, res, id, body) => {
        try {
            const updatedAuteur = await auteurService.updateAuteur(id, body);
            if (!updatedAuteur) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, error: 'Auteur non trouvé' }));
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedAuteur));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: error.message }));
        }
    },

    deleteAuteur: async (req, res, id) => {
        try {
            const deletedAuteur = await auteurService.deleteAuteur(id);
            if (!deletedAuteur) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, error: 'Auteur non trouvé' }));
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'Auteur supprimé' }));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: error.message }));
        }
    }
};