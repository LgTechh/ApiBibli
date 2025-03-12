export const creerAuteur = (ID_auteur, Nom, Prenom, Nationalité, Jour_de_naissance, Mois_de_naissance, Annee_de_naissance = null) => ({
    ID_auteur,
    Nom,
    Prenom,
    Nationalité,
    Jour_de_naissance,
    Mois_de_naissance,
    Annee_de_naissance,
});

export const validerAuteur = (auteur) => {
    const erreurs = []

    if (!auteur.ID_auteur || !auteur.Nom || !auteur.Prenom, !auteur.Annee_de_naissance) {
        erreurs.push("Des données ne sont pas valides ou manquantes")
    } else {
        console.log("La vérification des données est réussie ✅");
    }

    if (auteur.Annee_de_naissance && isNaN(auteur.Annee_de_naissance)) {
        erreurs.push("L'année de publication doit être un nombre.");
    } else {
        console.log("La vérification de l'année de naissance est réussie ✅")
    }

    return {
        estValide: erreurs.length === 0,
        erreurs
    }
};