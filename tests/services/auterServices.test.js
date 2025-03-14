import { describe, test, expect, beforeEach } from "vitest";
import { openDb, resetDbTest } from "../../config/dbTest.js";
import { logger } from "../../utils/logger.js";
import {auteurService} from "../../services/auteurService.js";
import {auteurRepository} from "../../repositories/auteurRepository.js";

process.env.NODE_ENV = "test";

describe("Tests du services des auteurs", async () => {
    let db;
    let auteurServ;
    let auteurRepo;
    await resetDbTest();

    beforeEach(async () => {
        db = await openDb();
        auteurServ = auteurService;
        auteurRepo = auteurRepository;
    });
    afterEach(async () => {
        auteurServ = {};
        auteurRepo = {};
        await db.close();

    });

    test("❌ getAllAuteur - doit renvoyer une erreur", async () => {
        // On force une situation d'erreur en simulant un problème avec le repository
        auteurRepo.getAllAuteur = async () => {
            throw new Error("Erreur lors de la récupération des auteurs");
        };

        try {
            await auteurServ.getAllAuteur();
        } catch (error) {
            expect(error.message).toContain("Erreur lors de la récupération des auteurs:");
        }
    });

    test("❌ updateAuteur - doit renvoyer une erreur", async () => {
        auteurRepo.updateAuteur = async () => {
            throw new Error("Problème de validation des données");
        };

        try {
            await auteurServ.updateAuteur(1, {ID_auteur:50, Nom: "Hugo", Prenom: "Victor", Annee_de_naissance: 1802 });
        } catch (error) {
            expect(error.message).toContain("Erreur lors de la mise à jour de l'auteur:");
        }
    });

    test("❌ createAuteur - doit renvoyer une erreur", async () => {
        auteurRepo.createAuteur = async () => {
            throw new Error("Erreur lors de la création de l'auteur")
        }

        try {
            await auteurServ.createAuteur({ID_auteur:59, Nom: "Hugo", Prenom: "Victor", Annee_de_naissance: 1802 });
        } catch (error) {
            expect(error.message).toContain("Erreur lors de la création de l'auteur:")
        }
    });

    test("❌ getAuteurById - doit renvoyer une erreur", async () => {
        auteurRepo.getAuteurById = async () => {
            throw new Error("Erreur lors de l'auteur")
        }

        try {
            await auteurServ.getAuteurById(1);
        } catch (error) {
            expect(error.message).toContain("Erreur lors de la récupération de l'auteur:");
        }
    });

});