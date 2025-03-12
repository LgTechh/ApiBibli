export const creerEmprunt = (ID_Emprunt, ID_Membre, ID_Exemplaire, Date_Emprunt, Date_Retour_Prevue, Date_Retour_Effective = null) => ({
    ID_Emprunt,
    ID_Membre,
    ID_Exemplaire,
    Date_Emprunt,
    Date_Retour_Prevue,
    Date_Retour_Effective,
});


export const validerEmprunt = (emprunt) => {
    const erreurs = []

    if (!emprunt.ID_Emprunt || !emprunt.ID_Membre || !emprunt.ID_Exemplaire || !emprunt.Date_Emprunt) {
        erreurs.push("Des données ne sont pas valides ou manquantes")
    } else {
        console.log("La vérification à résussie ✅");
    }


    return {
        estValide: erreurs.length === 0,
        erreurs
    }
};