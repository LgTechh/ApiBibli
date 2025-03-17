export const creerLivre = (ID_Livre, ID_auteur, ID_categorie, Titre, ISBN, Annee_Publication, Nb_page, ID_editeur = null) => ({
    ID_Livre,
    ID_auteur,
    ID_categorie,
    Titre,
    ISBN,
    Annee_Publication,
    Nb_page,
    ID_editeur,
});

export const validerLivre = (livre) => {
    const erreurs = [];

    if (!livre.Titre || livre.Titre.trim() === '') {
        erreurs.push("Le titre est requis.");
    } else {
        console.log("La vérification du titre à réussie ✅");
    }

    const dateAjour = new Intl.DateTimeFormat("fr-FR", { year: "numeric" }).format(new Date())

    if (livre.Annee_Publication && isNaN(livre.Annee_Publication) && livre.Annee_Publication <= dateAjour) {
        erreurs.push("L'année de publication doit être un nombre.");
    } else {
        console.log("La vérification de l'année de publication est réussie ✅");
    }

    if (livre.Nb_page && (isNaN(livre.Nb_page) || livre.Nb_page <= 0)) {
        erreurs.push("Le nombre de pages doit être un nombre positif.");
    } else {
        console.log("La vérification du nombre de page est réussie ✅");
    }

    return {
        estValide: erreurs.length === 0,
        erreurs
    };
};

export const estEmpruntable = (livre, EXEMPLAIRE = []) =>
     EXEMPLAIRE.some(EXEMPLAIRE => EXEMPLAIRE.ID_Livre === livre.id && EXEMPLAIRE.Disponibilite === true);
