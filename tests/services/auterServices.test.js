import { describe, test, expect, beforeEach } from "vitest";
import { openDb, resetDbTest } from "../../config/dbTest.js";
import { logger } from "../../utils/logger.js";
import {auteurService} from "../../services/auteurService.js";

process.env.NODE_ENV = "test";

describe("Tests du services des auteurs", async () => {
    let db;
    let auteurServ;
    await resetDbTest();

    beforeEach(async () => {
        db = await openDb();
        auteurServ = auteurService;
    });
    afterEach(async () => {
        auteurServ = {};
        await db.close();

    });


});