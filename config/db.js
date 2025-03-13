import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { readFile } from "fs/promises";

console.log('Chemin de la base de données :', path.resolve('./Data/database.db'));

const getDbPath = () => {
    return process.env.NODE_ENV === "test"
        ? path.resolve("./Data/database_test.db")
        : path.resolve("./Data/database.db");

};

export async function openDb() {
    console.log("Tentative d'ouverture de la BDD");
    const dbPath = getDbPath();

    return open({
        filename: dbPath,
        driver: sqlite3.Database,
    });
}

export async function initDb(db) {
    try {
        const sql = await readFile('SQL/init.sql', 'utf8');
        await db.exec(sql);
        console.log("Base de données initialisée avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'initialisation de la base de données :", error);
        throw new Error("Failed to initialize database");
    }
}
