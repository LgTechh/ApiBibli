import { describe, test, expect, beforeEach } from "vitest";
import { livreRepository } from '../repositories/livreRepository.js';
import { openDb, resetDbTest } from "../config/dbTest.js";
import { logger } from "../utils/logger.js";

process.env.NODE_ENV = "test";

describe("Tests du repository des auteurs", () => {
    let db;
    let livreRepo;

    beforeEach(async () => {
        await resetDbTest();
        db = await openDb();
        livreRepo = livreRepository;
    });

    test("✅ Test: getAllAuteur", async () => {
        const livres = await livreRepo.getAllLivres();
        const filteredLivres = livres.filter(livre => livre.ID_Livre === 1);

        expect(filteredLivres).toEqual([
            {
                ID_Livre: 1,
                ID_auteur: 1,
                ID_categorie: 1,
                Titre: "The Old Man and the Sea",
                ISBN: "978-1234567890",
                Annee_Publication: 1952,
                Nb_page: 127,
                ID_editeur: 1
            }
        ]);
    });

    test("✅ Test : getLivresByCategorie - doit récupérer les livres d'une catégorie", async () => {
        const categorieId = 1;

        const livres = await livreRepo.getLivresByCategorie(categorieId);

        const livresAttendus = [
            {
                ID_Livre: 1,
                ID_auteur: 1,
                ID_categorie: 1,
                Titre: "The Old Man and the Sea",
                ISBN: "978-1234567890",
                Annee_Publication: 1952,
                Nb_page: 127,
                ID_editeur: 1,
                categorie: {
                    nom: "Fiction",
                    description: "Livres de fiction"
                }
            }
        ];

        expect(livres).toEqual(livresAttendus);
    });

    test("✅ Test : getLivreByAuteur - doit récupérer les livres d'un auteur", async () => {
        const auteurId = 1;

        const livres = await livreRepo.getLivreByAuteur(auteurId);

        const livresAttendus = [
            {
                ID_Livre: 1,
                ID_auteur: 1,
                ID_categorie: 1,
                Titre: "The Old Man and the Sea",
                ISBN: "978-1234567890",
                Annee_Publication: 1952,
                Nb_page: 127,
                ID_editeur: 1,
                auteur: {
                    nom: "Hemingway",
                    prenom: "Ernest"
                }
            },
            {
                ID_Livre: 13,
                ID_auteur: 1,
                ID_categorie: 2,
                Titre: "A Farewell to Arms",
                ISBN: "978-0099908401",
                Annee_Publication: 1929,
                Nb_page: 355,
                ID_editeur: 3,
                auteur: {
                    nom: "Hemingway",
                    prenom: "Ernest"
                }
            }
        ];

        expect(livres).toEqual(livresAttendus);
    });


    test("✅ Test: createLivres", async () => {
        const livre = {
            ID_auteur: 1,
            ID_categorie: 1,
            Titre: "Test",
            ISBN: "978-1234567898",
            Annee_Publication: 1952,
            Nb_page: 127,
            ID_editeur: 1,
        };

        const livreId = await livreRepo.createLivre(livre);
        const livreRetourne = await livreRepo.getLivreById(livreId.ID_Livre);

        const livreAttendu = {
            ID_Livre: livreId.ID_Livre,
            ID_auteur: 1,
            ID_categorie: 1,
            Titre: "Test",
            ISBN: "978-1234567898",
            Annee_Publication: 1952,
            Nb_page: 127,
            ID_editeur: 1,
        };

        expect(livreRetourne).toEqual(livreAttendu);
    });

    test("✅ Test : getLivreById - doit récupérer un livre par son ID", async () => {
        const livre = await livreRepo.getLivreById(1);
        expect(livre).toMatchObject({
            ID_Livre: 1,
            Titre: "The Old Man and the Sea",
            ISBN: "978-1234567890",
        });
    });

    test("✅ Test : updateLivre - doit modifier un livre existant", async () => {
        const updatedLivre = {
            ID_Livre: 1,
            ID_auteur: 1,
            ID_categorie: 1,
            Titre: "The Old Man and the Sea",
            ISBN: "978-1234567890",
            Annee_Publication: 1958,
            Nb_page: 127,
            ID_editeur: 1
        };

        await livreRepo.updateLivre(1, updatedLivre);
        const livreModifie = await livreRepo.getLivreById(1);
        expect(livreModifie.Annee_Publication).toBe(1958);
    });

    test("✅ Test : deleteLivre - doit supprimer un livre", async () => {
        await livreRepo.deleteLivre(1);

        try {
            await livreRepo.getLivreById(1);
        } catch (error) {
            expect(error.message).toBe("Livre non trouvé");
        }
    });
});
