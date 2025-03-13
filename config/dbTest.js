import sqlite3 from 'sqlite3';
import path from 'path';
import { copyFileSync } from 'fs';

/**
 * Ouvre la base de données de test.
 * @returns {sqlite3.Database} Instance de la base de données de test.
 */
export const openDb = () => {
    const dbPath = path.resolve('./Data/database_test.db');
    const db = new sqlite3.Database(dbPath);
    return db;
};

/**
 * Copie la base de données initiale dans la base de données de test.
 */
const copyDatabase = () => {
    const sourceDbPath = path.resolve('./Data/database.db');
    const testDbPath = path.resolve('./Data/database_test.db');
    copyFileSync(sourceDbPath, testDbPath);  // Copie du fichier
};

/**
 * Réinitialise la base de données de test pour revenir à son état initial.
 */
export const resetDbTest = () => {
    try {
        copyDatabase();  // Copier la base de données
        console.log("Base de données de test réinitialisée");
    } catch (error) {
        console.error("Erreur lors de la réinitialisation de la base de données de test:", error);
    }
};