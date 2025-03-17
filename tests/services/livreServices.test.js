import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { openDb, resetDbTest } from "../../config/dbTest.js";
import { livreService } from "../../services/livreService.js";
import { livreRepository } from "../../repositories/livreRepository.js";

process.env.NODE_ENV = "test";

describe("Tests du service des livres", async () => {
    let db;
    let livreServ;
    let livreRepo;
    await resetDbTest();

    beforeEach(async () => {
        db = await openDb();
        livreServ = livreService;
        livreRepo = livreRepository;
    });

    afterEach(async () => {
        livreServ = {};
        livreRepo = {};
        await db.close();
    });

    test("❌ getAllLivres - doit renvoyer une erreur", async () => {
        livreRepo.getAllLivres = async () => {
            throw new Error("Erreur lors de la récupération des livres");
        };

        try {
            await livreServ.getAllLivres();
        } catch (error) {
            expect(error.message).toContain("Erreur lors de la récupération des livres:");
        }
    });

    test("❌ getLivresByCategorie - doit renvoyer une erreur", async () => {
        livreRepo.getLivresByCategorie = async () => {
            throw new Error("Erreur lors de la récupération des livres par catégorie");
        };

        try {
            await livreServ.getLivresByCategorie(1);
        } catch (error) {
            expect(error.message).toContain("Erreur lors de la récupération des livres:");
        }
    });

    test("❌ getLivreByAuteur - doit renvoyer une erreur", async () => {
        livreRepo.getLivreByAuteur = async () => {
            throw new Error("Erreur lors de la récupération des livres par auteur");
        };

        try {
            await livreServ.getLivreByAuteur(1);
        } catch (error) {
            expect(error.message).toContain("Erreur lors de la récupéation des livres:");
        }
    });

    test("❌ createLivre - doit renvoyer une erreur", async () => {
        livreRepo.createLivre = async () => {
            throw new Error("Erreur lors de la création du livre");
        };

        try {
            await livreServ.createLivre({});
        } catch (error) {
            expect(error.message).toContain("Données de livre invalides:");
            console.log("Vérification de la validation réussie ✅");
        }

        try {
            await livreServ.createLivre({
                ID_auteur: 1,
                ID_categorie: 2,
                Titre: "Test Livre",
                ISBN: "123456789",
                Annee_Publication: "2025",
                Nb_page: 200,
                ID_editeur: 3
            });
        } catch (error) {
            expect(error.message).toContain("Erreur lors de la création du livre:");
        }
    });

    test("❌ getLivreById - doit renvoyer une erreur", async () => {
        livreRepo.getLivreById = async () => {
            throw new Error("Erreur lors de la récupération du livre");
        };

        try {
            await livreServ.getLivreById(1);
        } catch (error) {
            expect(error.message).toContain("Erreur lors de la récupération du livre:");
        }
    });

    test("❌ updateLivre - doit renvoyer une erreur", async () => {
        livreRepo.updateLivre = async () => {
            throw new Error("Erreur lors de la mise à jour du livre");
        };

        try {
            await livreServ.updateLivre(1, {});
        } catch (error) {
            expect(error.message).toContain("Données de livre invalides:");
            console.log("La vérification de la validation a réussi ✅");
        }

        try {
            await livreServ.updateLivre(1, {
                ID_auteur: 1,
                ID_categorie: 2,
                Titre: "Nouveau Test Livre",
                ISBN: "987654321",
                Annee_Publication: "2024",
                Nb_page: 150,
                ID_editeur: 4
            });
        } catch (error) {
            expect(error.message).toContain("Erreur lors de la mise à jour du livre:");
        }
    });

    test("❌ deleteLivre - doit renvoyer une erreur", async () => {
        livreRepo.deleteLivre = async () => {
            throw new Error("Erreur lors de la suppression du livre");
        };

        try {
            await livreServ.deleteLivre(3);
        } catch (error) {
            expect(error.message).toContain("Erreur lors de la suppression du livre:");
        }
    });
});
