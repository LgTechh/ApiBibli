import { openDb } from './outils/db.js';
import { insertData } from './SQL/init.js';

(async () => {
    try {

        const db = await openDb();

        console.log('Base de données ouverte avec succès !');

        await insertData(db);

        console.log("Données insérées avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'exécution :", error);
    }
})();
