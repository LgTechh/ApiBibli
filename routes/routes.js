import { livreController } from '../controllers/livreController.js';
import { auteurController } from '../controllers/auteurController.js';
import { empruntController } from '../controllers/empruntController.js';
import { logger } from '../utils/logger.js';
import { parseRequestBody } from '../utils/httpHelper.js';

export const handleRequest = async (req, res) => {
    const url = req.url;
    const method = req.method;

    // Routes pour les livres
    if (url.startsWith('/api/livres') && method === 'GET') {
        const urlParams = new URLSearchParams(url.split('?')[1]); // Récupérer les paramètres de l'URL
        const categorieId = urlParams.get('categorie');  // Récupère la catégorie de l'URL (par exemple, ?categorie=1)
        const auteurId = urlParams.get('auteur');
        console.log("Paramètre auteurId récupéré :", auteurId);

        if (categorieId) {
           await livreController.getLivresByCategorie(req, res, categorieId);
        } else if (auteurId){
           await livreController.getLivreByAuteur(req, res, auteurId);
        }else {
           await livreController.getAllLivres(req, res);
        }
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
        await livreController.getLivreById(req, res, parseInt(id));
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

    //route pour emprunts
    else if (url === '/api/emprunts' && method === 'GET') {
        await empruntController.getAllEmprunt(req, res);
    }
    else if (url === '/api/emprunts' && method === 'POST') {
        parseRequestBody(req)
            .then((body) => {
                empruntController.createEmprunt(req, res, body);
            })
            .catch((error) => {
                console.error('Erreur lors de l\'analyse du corps de la requête :', error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Erreur de traitement de la requête' }));
            });
    }
    else if (url.match(/^\/api\/emprunts\/([0-9]+)$/) && method === 'GET') {
        const id = url.split('/')[3];
       await empruntController.getEmpruntById(req, res, parseInt(id));
    }
    else if (url.match(/^\/api\/emprunts\/([0-9]+)$/) && method === 'PUT') {
        const id = url.split('/')[3];
        try {
            const body = await parseRequestBody(req);
            await empruntController.updateEmprunt(req, res, parseInt(id), body);
        } catch (error) {
            console.error('Erreur lors du traitement de la requête PUT :', error);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur de traitement de la requête' }));
        }
    }
    else if (url.match(/^\/api\/emprunts\/([0-9]+)$/) && method === 'DELETE') {
        const id = url.split('/')[3];
        try {
            await empruntController.deleteEmprunt(req, res, parseInt(id));
        } catch (error) {
            console.error('Erreur lors de la suppression du livre :', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: "Erreur de la suppréssion de l'emprunts" }));
        }
    }

    //Route pour auteur
    else if (url === '/api/auteurs' && method === 'GET') {
        await auteurController.getAllAuteur(req, res);
    }
    else if (url === '/api/auteurs' && method === 'POST') {
        parseRequestBody(req)
            .then((body) => {
                auteurController.createAuteur(req, res, body);
            })
            .catch((error) => {
                console.error('Erreur lors de l\'analyse du corps de la requête :', error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Erreur de traitement de la requête' }));
            });
    }
    else if (url.match(/^\/api\/auteurs\/([0-9]+)$/) && method === 'GET') {
        const id = url.split('/')[3];
        await auteurController.getAuteurById(req, res, parseInt(id));
    }
    else if (url.match(/^\/api\/auteurs\/([0-9]+)$/) && method === 'PUT') {
        const id = url.split('/')[3];
        try {
            const body = await parseRequestBody(req);
            await auteurController.updateAuteur(req, res, parseInt(id), body);
        } catch (error) {
            console.error('Erreur lors du traitement de la requête PUT :', error);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur de traitement de la requête' }));
        }
    }
    else if (url.match(/^\/api\/auteurs\/([0-9]+)$/) && method === 'DELETE') {
        const id = url.split('/')[3];
        try {
            await auteurController.deleteAuteur(req, res, parseInt(id));
        } catch (error) {
            console.error('Erreur lors de la suppression du livre :', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: "Erreur de suppression de l'auteur" }));
        }
    }

    else {
        logger.warn(`Route non trouvée: ${method} ${url}`);
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Route non trouvée' }));
    }
};

