import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { openDb, resetDbTest } from "../../config/dbTest.js";
import { empruntService } from "../../services/empruntService.js";
import { empruntRepository } from "../../repositories/empruntRepository.js";

process.env.NODE_ENV = "test";

describe("Tests du service des emprunts", async () => {
    let db;
    let empruntServ;
    let empruntRepo;
    await resetDbTest();

    beforeEach(async () => {
        db = await openDb();
        empruntServ = empruntService;
        empruntRepo = empruntRepository;
    });

    afterEach(async () => {
        empruntServ = {};
        empruntRepo = {};
        await db.close();
    });

    test("❌ getAllEmprunt - doit renvoyer une erreur", async () => {
        empruntRepo.getAllEmprunt = async () => {
            throw new Error("Erreur lors de la récupération des emprunts");
        };

        try {
            await empruntServ.getAllEmprunt();
        } catch (error) {
            expect(error.message).toContain("Erreur lors de la récupération des livres:");
        }
    });

    test("❌ createEmprunt - doit renvoyer une erreur", async () => {
        empruntRepo.createEmprunt = async () => {
            throw new Error("Erreur lors de la création de l'emprunt");
        };

        try {
            await empruntServ.createEmprunt({});
        } catch (error) {
            expect(error.message).toContain("Les valeurs d'emprunt, ne sont pas défini correctement");
            console.log("Vérification de la validation réussie ✅");
        }

        try {
            await empruntServ.createEmprunt({
                ID_Emprunt: 1,
                ID_Membre: 2,
                ID_Exemplaire: 3,
                Date_Emprunt: "2025-03-17",
                Date_Retour_Prevue: "2025-04-17"
            });
        } catch (error) {
            expect(error.message).toContain("Erreur lors de la création du livre:");
        }
    });

    test("❌ getEmpruntById - doit renvoyer une erreur", async () => {
        empruntRepo.getEmpruntById = async () => {
            throw new Error("Erreur lors de la récupération de l'emprunt");
        };

        try {
            await empruntServ.getEmpruntById(1);
        } catch (error) {
            expect(error.message).toContain("Erreur lors de la récupération du livre:");
        }
    });

    test("❌ updateEmprunt - doit renvoyer une erreur", async () => {
        empruntRepo.updateEmprunt = async () => {
            throw new Error("Problème lors de la mise à jour");
        };

        try {
            await empruntServ.updateEmprunt(1, {});
        } catch (error) {
            expect(error.message).toContain("Les ID sont obligatoire");
            console.log("La vérification de la validation a réussi ✅");
        }

        try {
            await empruntServ.updateEmprunt(1, {
                ID_Emprunt: 1,
                ID_Membre: 2,
                ID_Exemplaire: 3,
                Date_Emprunt: "2025-03-17",
                Date_Retour_Prevue: "2025-04-17"
            });
        } catch (error) {
            expect(error.message).toContain("Erreur lors de la mise à jour du livre:");
        }
    });

    test("❌ deleteEmprunt - doit renvoyer une erreur", async () => {
        empruntRepo.deleteEmprunt = async () => {
            throw new Error("Erreur lors de la suppression de l'emprunt");
        };

        try {
            await empruntServ.deleteEmprunt(2);
        } catch (error) {
            expect(error.message).toContain("Erreur lors de la suppression du livre:");
        }
    });
});
