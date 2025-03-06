import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { readFile } from "fs/promises";

console.log('Chemin de la base de données :', path.resolve('./database.db'));

export async function openDb() {
    console.log("Tentative d'ouverture de la base de données...");
    try {
        const db = await open({
            filename: "./Data/database.db",
            driver: sqlite3.Database,
        });
        console.log("Base de données ouverte avec succès !");
        await initDb(db);
        return db;
    } catch (error) {
        console.error("Erreur lors de l'ouverture de la base de données :", error);
        throw new Error("Failed to open database");
    }
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
