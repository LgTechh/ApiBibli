import { openDb } from '../config/db.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const initDbTest = async () => {
    const db = await openDb();
    const schemaPath = path.join(__dirname, '../SQL/init.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    await db.exec(schema);
};
