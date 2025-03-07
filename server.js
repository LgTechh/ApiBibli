import http from "http";
import { handleRequest } from './routes/routes.js';
import { logger } from './utils/logger.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Log incoming request
    //ajouter le logger ici

    handleRequest(req, res);

});
server.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}/`);
});
