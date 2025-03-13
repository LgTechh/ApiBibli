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
    } catch (error) {
        throw new Error("Failed to initialize database");
    }
}
