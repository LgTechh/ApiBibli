import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const dbPath = path.resolve('./Data/database.db');

async function openDb() {
    try {
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });
        console.log('Base de données ouverte avec succès !');
        return db;
    } catch (error) {
        console.error('Erreur lors de l\'ouverture de la base de données', error);
    }
}
async function runQueries() {
    const db = await openDb();

    if (!db) return;

    try {
        console.log("Afficher tous les livres d'un auteur spécifique ✅")
        const result1 = await db.all(`
            SELECT AUTEUR.Nom, AUTEUR.Prenom, LIVRE.Titre
            FROM AUTEUR
            JOIN AUTEUR_Livre ON AUTEUR_Livre.ID_auteur = AUTEUR.ID_auteur
            JOIN LIVRE ON AUTEUR_Livre.ID_Livre = LIVRE.ID_Livre
            WHERE AUTEUR.ID_auteur = 3;

        `);
        console.table(result1);

        console.log("Afficher tous les livres d'une catégorie donnée ✅")
        const result2 = await db.all(`
            SELECT LIVRE.Titre, CATEGORIE.Nom, CATEGORIE.Description
            FROM LIVRE
            JOIN LIVRE_CATEGORIE ON LIVRE_CATEGORIE.ID_Livre = LIVRE.ID_Livre
            JOIN CATEGORIE ON CATEGORIE.ID_categorie = LIVRE_CATEGORIE.ID_categorie
            WHERE LIVRE_CATEGORIE.ID_categorie = 5;

        `);
        console.table(result2);

        console.log("Lister Les auteurs Fançais ✅")
        const result3 = await db.all(`SELECT * FROM AUTEUR
        WHERE Nationalité = 'Française';

        `);
        console.table(result3);

        console.log("Afficher les livres avec les auteurs et les catégories ✅")
        const result4 = await db.all(`
            SELECT AUTEUR.Prenom, AUTEUR.Nom, LIVRE.Titre, CATEGORIE.Nom AS Categorie, CATEGORIE.Description
            FROM AUTEUR
                     JOIN AUTEUR_Livre ON AUTEUR_Livre.ID_auteur = AUTEUR.ID_auteur
                     JOIN LIVRE ON AUTEUR_Livre.ID_Livre = LIVRE.ID_Livre
                     JOIN CATEGORIE ON LIVRE.ID_categorie = CATEGORIE.ID_categorie
            
        `)
        console.table(result4);

        console.log("Afficher le nombre de livres par catégorie ✅")
        const result5 = await db.all(`
        SELECT CATEGORIE.Nom AS Categorie, COUNT(ID_Livre) AS Nombre_de_Livre
        FROM LIVRE_CATEGORIE
        JOIN CATEGORIE ON LIVRE_CATEGORIE.ID_CATEGORIE = CATEGORIE.ID_categorie
        GROUP BY LIVRE_CATEGORIE.ID_categorie
        
        `)
        console.table(result5);

        console.log("L'auteur ayant écrit le plus de livre ✅")
        const result6 = await db.all(`
        SELECT AUTEUR.Nom, AUTEUR.Prenom
        FROM AUTEUR
        JOIN AUTEUR_LIVRE ON AUTEUR_LIVRE.ID_AUTEUR = AUTEUR.ID_auteur
        GROUP BY AUTEUR.ID_auteur 
        ORDER BY COUNT(AUTEUR_Livre.ID_Livre)  DESC
        LIMIT  1;

        `)
        console.table(result6);

    } catch (error) {
        console.error("Erreur lors de l'exécution des requêtes :", error);
    } finally {
        await db.close();
        console.log('Base de données fermée.');
    }
}


runQueries();
