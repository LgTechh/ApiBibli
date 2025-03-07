import { livreController } from '../controllers/livreController.js';
//import { auteurController } from '../controllers/auteurController.js';
//import { empruntController } from '../controllers/empruntController.js';
import { logger } from '../utils/logger.js';
import { parseRequestBody } from '../utils/httpHelper.js';

export const handleRequest = async (req, res) => {
    const url = req.url;
    const method = req.method;

    // Routes pour les livres
    if (url === '/api/livres' && method === 'GET') {
        livreController.getAllLivres(req, res);
    }
    else if (url === '/api/livres' && method === 'POST') {
        parseRequestBody(req)
            .then((body) => {
                livreController.createLivre(req, res, body);
            })
            .catch((error) => {
                console.error('Erreur lors de l\'analyse du corps de la requête :', error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Erreur de traitement de la requête' }));
            });
    }

    else if (url.match(/^\/api\/livres\/([0-9]+)$/) && method === 'GET') {
        const id = url.split('/')[3];
        livreController.getLivreById(req, res, parseInt(id));
    }
    else if (url.match(/^\/api\/livres\/([0-9]+)$/) && method === 'PUT') {
        const id = url.split('/')[3];
        try {
            const body = await parseRequestBody(req);
            await livreController.updateLivre(req, res, parseInt(id), body);
        } catch (error) {
            console.error('Erreur lors du traitement de la requête PUT :', error);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur de traitement de la requête' }));
        }
    }
    else if (url.match(/^\/api\/livres\/([0-9]+)$/) && method === 'DELETE') {
        const id = url.split('/')[3];
        try {
            await livreController.deleteLivre(req, res, parseInt(id));
        } catch (error) {
            console.error('Erreur lors de la suppression du livre :', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur de suppression du livre' }));
        }
    }
    else {
        logger.warn(`Route non trouvée: ${method} ${url}`);
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Route non trouvée' }));
    }
};

