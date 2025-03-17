import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { openDb, resetDbTest } from "../../config/dbTest.js";
import { livreController } from "../../controllers/livreController.js";
import { livreService } from "../../services/livreService.js";

process.env.NODE_ENV = "test";

describe("Tests du controller des livres", async () => {
    let db;
    let livreServ;
    let livreCtrl;
    await resetDbTest();

    const createMockResponse = () => ({
        writeHead: vi.fn(),
        end: vi.fn().mockReturnValue({})
    });

    beforeEach(async () => {
        db = await openDb();
        livreServ = livreService;
        livreCtrl = livreController;
    });

    afterEach(async () => {
        livreServ = {};
        livreCtrl = {};
        await db.close();
        vi.restoreAllMocks();
    });

    test("✅ getAllLivres - doit renvoyer tous les livres", async () => {
        const livresMock = [
            { ID_Livre: 1, Titre: "The Old Man and the Sea" },
            { ID_Livre: 2, Titre: "To Kill a Mockingbird" }
        ];
        vi.spyOn(livreServ, 'getAllLivres').mockResolvedValue(livresMock);
        const res = createMockResponse();

        await livreCtrl.getAllLivres({}, res);

        expect(livreServ.getAllLivres).toHaveBeenCalled();
        expect(res.writeHead).toHaveBeenCalledWith(200, {'Content-Type': 'application/json'});
        expect(res.end).toHaveBeenCalledWith(JSON.stringify(livresMock));
    });

    test("❌ getAllLivres - doit gérer les erreurs", async () => {
        vi.spyOn(livreServ, 'getAllLivres').mockRejectedValue(new Error("Erreur de service"));
        const res = createMockResponse();

        await livreCtrl.getAllLivres({}, res);

        expect(res.writeHead).toHaveBeenCalledWith(500, {'Content-Type': 'application/json'});
        expect(res.end).toHaveBeenCalledWith(JSON.stringify({
            success: false,
            error: "Erreur de service"
        }));
    });

    test("✅ getLivresByCategorie - doit renvoyer les livres d'une catégorie", async () => {
        const categorieId = 1;
        const livresCatMock = [{ ID_Livre: 1, Titre: "The Old Man and the Sea", ID_categorie: 1 }];
        vi.spyOn(livreServ, 'getLivresByCategorie').mockResolvedValue(livresCatMock);
        const res = createMockResponse();

        await livreCtrl.getLivresByCategorie({}, res, categorieId);

        expect(livreServ.getLivresByCategorie).toHaveBeenCalledWith(categorieId);
        expect(res.writeHead).toHaveBeenCalledWith(200, {'Content-Type': 'application/json'});
        expect(res.end).toHaveBeenCalledWith(JSON.stringify(livresCatMock));
    });

    test("❌ getLivresByCategorie - doit gérer les erreurs", async () => {
        vi.spyOn(livreServ, 'getLivresByCategorie').mockRejectedValue(new Error("Catégorie invalide"));
        const res = createMockResponse();

        await livreCtrl.getLivresByCategorie({}, res, 999);

        expect(res.writeHead).toHaveBeenCalledWith(500, {'Content-Type': 'application/json'});
        expect(res.end).toHaveBeenCalledWith(JSON.stringify({
            success: false,
            error: "Catégorie invalide"
        }));
    });

    test("✅ getLivreByAuteur - doit renvoyer les livres d'un auteur", async () => {
        const auteurId = 1;
        const livresAutMock = [{ ID_Livre: 1, Titre: "The Old Man and the Sea", ID_auteur: 1 }];
        vi.spyOn(livreServ, 'getLivreByAuteur').mockResolvedValue(livresAutMock);
        const res = createMockResponse();

        await livreCtrl.getLivreByAuteur({}, res, auteurId);

        expect(livreServ.getLivreByAuteur).toHaveBeenCalledWith(auteurId);
        expect(res.writeHead).toHaveBeenCalledWith(200, {'Content-Type': 'application/json'});
        expect(res.end).toHaveBeenCalledWith(JSON.stringify(livresAutMock));
    });

    test("❌ getLivreByAuteur - doit gérer les erreurs", async () => {
        vi.spyOn(livreServ, 'getLivreByAuteur').mockRejectedValue(new Error("Auteur invalide"));
        const res = createMockResponse();

        await livreCtrl.getLivreByAuteur({}, res, 999);

        expect(res.writeHead).toHaveBeenCalledWith(500, {'Content-Type': 'application/json'});
        expect(res.end).toHaveBeenCalledWith(JSON.stringify({
            success: false,
            error: "Auteur invalide"
        }));
    });

    test("✅ getLivreById - doit renvoyer un livre par son ID", async () => {
        const livreId = 1;
        const livreMock = { ID_Livre: 1, Titre: "The Old Man and the Sea" };
        vi.spyOn(livreServ, 'getLivreById').mockResolvedValue(livreMock);
        const res = createMockResponse();

        await livreCtrl.getLivreById({}, res, livreId);

        expect(livreServ.getLivreById).toHaveBeenCalledWith(livreId);
        expect(res.writeHead).toHaveBeenCalledWith(200, {'Content-Type': 'application/json'});
        expect(res.end).toHaveBeenCalledWith(JSON.stringify(livreMock));
    });

    test("❌ getLivreById - doit gérer le cas d'un livre non trouvé", async () => {
        vi.spyOn(livreServ, 'getLivreById').mockResolvedValue(null);
        const res = createMockResponse();

        await livreCtrl.getLivreById({}, res, 999);

        expect(res.writeHead).toHaveBeenCalledWith(404, {'Content-Type': 'application/json'});
        expect(res.end).toHaveBeenCalledWith(JSON.stringify({
            success: false,
            error: 'Livre non trouvé'
        }));
    });


    test("✅ createLivre - doit créer un nouveau livre", async () => {
        const nouveauLivre = {
            ID_auteur: 1,
            ID_categorie: 1,
            Titre: "Nouveau Livre",
            ISBN: "978-0987654321",
            Annee_Publication: 2025,
            Nb_page: 300
        };
        const livreCree = { ID_Livre: 14, ...nouveauLivre };
        vi.spyOn(livreServ, 'createLivre').mockResolvedValue(livreCree);
        const res = createMockResponse();

        await livreCtrl.createLivre({}, res, nouveauLivre);

        expect(livreServ.createLivre).toHaveBeenCalledWith(nouveauLivre);
        expect(res.writeHead).toHaveBeenCalledWith(201, {'Content-Type': 'application/json'});
        expect(res.end).toHaveBeenCalledWith(JSON.stringify(livreCree));
    });

    test("❌ createLivre - doit gérer les erreurs de validation", async () => {
        vi.spyOn(livreServ, 'createLivre').mockRejectedValue(new Error("Le titre est requis"));
        const res = createMockResponse();

        await livreCtrl.createLivre({}, res, { ISBN: "123456789" });

        expect(res.writeHead).toHaveBeenCalledWith(400, {'Content-Type': 'application/json'});
        expect(res.end).toHaveBeenCalledWith(JSON.stringify({
            success: false,
            error: "Le titre est requis"
        }));
    });

    test("✅ updateLivre - doit mettre à jour un livre existant", async () => {
        const livreId = 1;
        const livreModifie = {
            ID_Livre: 1,
            Titre: "Titre Modifié",
            Annee_Publication: 1960
        };
        vi.spyOn(livreServ, 'updateLivre').mockResolvedValue(livreModifie);
        const res = createMockResponse();

        await livreCtrl.updateLivre({}, res, livreId, livreModifie);

        expect(livreServ.updateLivre).toHaveBeenCalledWith(livreId, livreModifie);
        expect(res.writeHead).toHaveBeenCalledWith(200, {'Content-Type': 'application/json'});
        expect(res.end).toHaveBeenCalledWith(JSON.stringify(livreModifie));
    });

    test("❌ updateLivre - doit gérer le cas d'un livre non trouvé", async () => {
        vi.spyOn(livreServ, 'updateLivre').mockResolvedValue(null);
        const res = createMockResponse();

        await livreCtrl.updateLivre({}, res, 999, {});

        expect(res.writeHead).toHaveBeenCalledWith(404, {'Content-Type': 'application/json'});
        expect(res.end).toHaveBeenCalledWith(JSON.stringify({
            success: false,
            error: "Livre non trouvé"
        }));
    });


    test("✅ deleteLivre - doit supprimer un livre", async () => {
        const livreId = 1;
        vi.spyOn(livreServ, 'deleteLivre').mockResolvedValue({ success: true });
        const res = createMockResponse();

        await livreCtrl.deleteLivre({}, res, livreId);

        expect(livreServ.deleteLivre).toHaveBeenCalledWith(livreId);
        expect(res.writeHead).toHaveBeenCalledWith(200, {'Content-Type': 'application/json'});
        expect(res.end).toHaveBeenCalledWith(JSON.stringify({
            success: true,
            message: "Livre supprimé"
        }));
    });


    test("❌ deleteLivre - doit gérer les erreurs", async () => {
        vi.spyOn(livreServ, 'deleteLivre').mockRejectedValue(new Error("Erreur de suppression"));
        const res = createMockResponse();

        await livreCtrl.deleteLivre({}, res, 1);

        expect(res.writeHead).toHaveBeenCalledWith(500, {'Content-Type': 'application/json'});
        expect(res.end).toHaveBeenCalledWith(JSON.stringify({
            success: false,
            error: "Erreur de suppression"
        }));
    });
});