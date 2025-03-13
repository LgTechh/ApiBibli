import { describe, test, expect, beforeEach } from "vitest";
import { auteurRepository } from '../repositories/auteurRepository.js';
import { openDb, resetDbTest } from "../config/dbTest.js";
import { logger } from "../utils/logger.js";

process.env.NODE_ENV = "test";

describe("Tests du repository des auteurs", () => {
    let db;
    let auteurRepo;

    beforeEach(async () => {
        await resetDbTest();
        db = await openDb();
        auteurRepo = auteurRepository;
    });

    test("✅ Test: getAllAuteur", async () => {
        const auteurs = await auteurRepo.getAllAuteur();
        const filteredAuteurs = auteurs.filter(auteur => auteur.ID_auteur === 1);

        expect(filteredAuteurs).toEqual([
            {
                ID_auteur: 1,
                Nom: "Hemingway",
                Prenom: "Ernest",
                Nationalité: "Américaine",
                Jour_de_naissance: "21",
                Mois_de_naissance: "07",
                Annee_de_naissance: 1899
            }
        ]);
    });

    test("✅ createAuteur - doit ajouter un nouvel auteur", async () => {
        const auteur = {
            ID_auteur: 100,
            Nom: 'Modiano',
            Prenom: 'Patrick',
            Nationalité: 'Française',
            Jour_de_naissance: '30',
            Mois_de_naissance: '07',
            Annee_de_naissance: 1945,
        };

        await auteurRepo.createAuteur(auteur);
        const auteurRetourne = await auteurRepo.getAuteurById(100);

        const auteurAttendu = {
            ID_auteur: 100,
            Nom: 'Modiano',
            Prenom: 'Patrick',
            Nationalité: 'Française',
            Jour_de_naissance: '30',
            Mois_de_naissance: '07',
            Annee_de_naissance: 1945,
        };


        expect(auteurRetourne).toEqual(auteurAttendu);
    });

    test("✅ getAuteurById - doit récupérer un auteur par son ID", async () => {
        const auteur = await auteurRepo.getAuteurById(1);
        expect(auteur).toMatchObject({
            ID_auteur: 1,
            Nom: "Hemingway",
            Prenom: "Ernest"
        });
    });

    test("✅ updateAuteur - doit modifier un auteur existant", async () => {
        const updatedAuteur = {
            ID_auteur: 1,
            Nom: "Hemingway",
            Prenom: "Ernest",
            Nationalité: "USA",
            Jour_de_naissance: "21",
            Mois_de_naissance: "07",
            Annee_de_naissance: 1899
        };

        await auteurRepo.updateAuteur(1, updatedAuteur);
        const auteurModifie = await auteurRepo.getAuteurById(1);
        expect(auteurModifie.Nationalité).toBe("USA");
    });

    test("✅ deleteAuteur - doit supprimer un auteur", async () => {
        await auteurRepo.deleteAuteur(1);

        try {
            await auteurRepo.getAuteurById(1);
        } catch (error) {
            expect(error.message).toBe("Auteur non trouvé");
        }
    });
});
