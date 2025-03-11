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
    }

    if (livre.Annee_Publication && isNaN(livre.Annee_Publication)) {
        erreurs.push("L'année de publication doit être un nombre.");
    }

    if (this.Nb_page && (isNaN(this.Nb_page) || this.Nb_page <= 0)) {
        erreurs.push("Le nombre de pages doit être un nombre positif.");
    }

    return {
        estValide: erreurs.length === 0,
        erreurs
    };
};

export const estEmpruntable = (livre, EXEMPLAIRE = []) =>
     EXEMPLAIRE.some(EXEMPLAIRE => EXEMPLAIRE.ID_Livre === livre.id && EXEMPLAIRE.Disponibilite === true);
