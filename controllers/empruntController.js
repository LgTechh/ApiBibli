import {empruntService} from "../services/empruntService.js";

export const empruntController = {
    getAllEmprunt: async (req, res) => {
        try {
            const emprunts = await empruntService.getAllEmprunt();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(emprunts));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: error.message }));
        }
    },

    getEmpruntById: async (req, res, id) => {
        try {
            const emprunt = await empruntService.getEmpruntById(id);
            if (!emprunt) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, error: 'Emprunt non trouvé' }));
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(emprunt));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: error.message }));
        }
    },

    createEmprunt: async (req, res, body) => {
        try {
            const newEmprunt = await empruntService.createEmprunt(body);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newEmprunt));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: error.message }));
        }
    },

    updateEmprunt: async (req, res, id, body) => {
        try {
            const updatedEmprunt = await empruntService.updateEmprunt(id, body);
            if (!updatedEmprunt) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, error: 'Emprunt non trouvé' }));
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedEmprunt));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: error.message }));
        }
    },

    deleteEmprunt: async (req, res, id) => {
        try {
            const deletedEmprunt = await empruntService.deleteEmprunt(id);
            if (!deletedEmprunt) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, error: 'Emprunt non trouvé' }));
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'Emprunt supprimé' }));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: error.message }));
        }
    }
};

