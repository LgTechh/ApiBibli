import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

console.log('Chemin de la base de données :', path.resolve('./Data/database.db'));

export async function openDb() {
    try {
        const db = await open({
            filename: "./Data/database.db",
            driver: sqlite3.Database,
        });
        console.log("Base de données ouverte avec succès !");
        await insertData(db);

        return db;
    } catch (error) {
        console.error("Erreur lors de l'ouverture de la base de données", error);
        throw new Error("Failed to open database");
    }
}

export async function insertData(db) {
    try {
        await db.run(`
            INSERT INTO AUTEUR (ID_auteur, Nom, Prenom, Nationalité, Jour_de_naissance, Mois_de_naissance, Annee_de_naissance)
            VALUES 
                (1, 'Hemingway', 'Ernest', 'Américaine', '21', '07', '1899'),
                (2, 'Orwell', 'George', 'Britannique', '25', '06', '1903'),
                (3, 'Dumas', 'Alexandre', 'Française', '24', '07', '1802'),
                (4, 'Shakespeare', 'William', 'Anglais', '23', '04', '1564'),
                (5, 'Asimov', 'Isaac', 'Russe', '02', '01', '1920'),
                (6, 'Tolkien', 'J.R.R.', 'Anglais', '03', '01', '1892');
        `);

        await db.run(`
            INSERT INTO CATEGORIE (ID_categorie, Nom, Description, Age_cible, Code_dewey)
            VALUES 
                (1, 'Fiction', 'Livres de fiction', 18, 823),
                (2, 'Science', 'Livres scientifiques', 16, 500),
                (3, 'Histoire', 'Livres sur l''histoire', 14, 900),
                (4, 'Arts', 'Livres sur l''art', 18, 700),
                (5, 'Technologie', 'Livres sur les technologies', 16, 600);
        `);

        await db.run(`
            INSERT INTO LIVRE (ID_Livre, ID_auteur, ID_categorie, Titre, ISBN, Annee_Publication, Nb_page, ID_editeur)
            VALUES
                (1, 1, 1, 'The Old Man and the Sea', '978-1234567890', 1952, 127, 1),
                (2, 2, 2, '1984', '978-0987654321', 1949, 328, 2),
                (3, 3, 3, 'Le Comte de Monte-Cristo', '978-0307465206', 1844, 1000, 1),
                (4, 3, 3, 'Les Trois Mousquetaires', '978-0192830360', 1844, 800, 2),
                (5, 4, 3, 'Hamlet', '978-0141013072', 1609, 200, 3),
                (6, 4, 3, 'Macbeth', '978-0141014161', 1606, 250, 4),
                (7, 5, 5, 'Fundamentals of Robotics', '978-0133061870', 1985, 500, 5),
                (8, 5, 5, 'The Intelligent Man''s Guide to Science', '978-0385003504', 1960, 350, 6),
                (9, 6, 5, 'The Hobbit', '978-0547928227', 1937, 310, 7),
                (10, 6, 5, 'The Lord of the Rings', '978-0544003415', 1954, 1200, 8),
                (11, 3, 4, 'Le Livre des merveilles', '978-2213225700', 1620, 300, 9),
                (12, 4, 4, 'Othello', '978-0451526938', 1604, 150, 10);
        `);

        await db.run(`
            INSERT INTO AUTEUR_Livre (ID_auteur, ID_Livre, Role)
            VALUES
                (3, 3, 'Auteur'),
                (3, 4, 'Auteur'),
                (4, 5, 'Auteur'),
                (4, 6, 'Auteur'),
                (5, 7, 'Auteur'),
                (5, 8, 'Auteur'),
                (6, 9, 'Auteur'),
                (6, 10, 'Auteur'),
                (3, 11, 'Auteur'),
                (4, 12, 'Auteur');
        `);

        console.log("Données insérées avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'insertion des données : ", error);
        throw new Error("Failed to insert data");
    }
}
