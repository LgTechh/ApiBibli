import { describe, test, expect, beforeEach } from "vitest";
import { empruntRepository } from '../repositories/empruntRepository.js';
import { openDb, resetDbTest } from "../config/dbTest.js";
import { logger } from "../utils/logger.js";

process.env.NODE_ENV = "test";

describe("Tests du repository des emprunts", () => {
    let db;
    let empruntRepo;

    beforeEach(async () => {
        await resetDbTest();
        db = await openDb();
        empruntRepo = empruntRepository;
    });


    afterEach(async () =>{
        empruntRepo = {};
        await db.close();
    });

    test("✅ Test: getAllEmprunt - doit récupérer tous les éléments", async () => {
        const emprunt = await empruntRepo.getAllEmprunt();
        const filteredEmprunt = emprunt.filter(emprunt => emprunt.ID_Emprunt === 1);

        expect(filteredEmprunt).toEqual([
            {
                ID_Emprunt: 1,
                ID_Membre: 2,
                ID_Exemplaire: 3,
                Date_Emprunt: "2025-03-06",
                Date_Retour_Prevue: "2025-03-20",
                Date_Retour_Effective: null
            }
        ]);
    });

    test("✅ Test : createEmprunt - doit ajouter un nouvel emprunt", async () => {
        const emprunt = {
            ID_Membre: 2,
            ID_Exemplaire: 3,
            Date_Emprunt: "2025-03-06",
            Date_Retour_Prevue: "2025-03-20",
            Date_Retour_Effective: null
        };

        const empruntId = await empruntRepo.createEmprunt(emprunt);
        const empruntRetourne = await empruntRepo.getEmpruntById(empruntId.ID_Emprunt);

        const empruntAttendu = {
            ID_Emprunt: empruntId.ID_Emprunt,
            ID_Membre: 2,
            ID_Exemplaire: 3,
            Date_Emprunt: "2025-03-06",
            Date_Retour_Prevue: "2025-03-20",
            Date_Retour_Effective: null
        };

        expect(empruntRetourne).toEqual(empruntAttendu);
    });

    test("✅ Test : getEmpruntById - doit récupérer un emprunt par son ID", async () => {
        const emprunt = await empruntRepo.getEmpruntById(1);
        expect(emprunt).toMatchObject({
            ID_Emprunt: 1,
            ID_Membre: 2,
            Date_Emprunt: "2025-03-06",
        });
    });

    test("✅ Test : updateEmprunt - doit modifier un emprunt existant", async () => {
        const updatedEmprunt = {
            ID_Emprunt: 1,
            ID_Membre: 2,
            ID_Exemplaire: 3,
            Date_Emprunt: "2025-03-06",
            Date_Retour_Prevue: "2025-03-20",
            Date_Retour_Effective: "2025-03-13"
        };

        await empruntRepo.updateEmprunt(1, updatedEmprunt);
        const empruntModifie = await empruntRepo.getEmpruntById(1);
        expect(empruntModifie.Date_Retour_Effective).toBe("2025-03-13");
    });

    test("✅ Test : deleteEmprunt - doit supprimer un emprunt", async () => {
        await empruntRepo.deleteEmprunt(1);

        try {
            await empruntRepo.getEmpruntById(1);
        } catch (error) {
            expect(error.message).toBe("Livre non trouvé");
        }
    });

});