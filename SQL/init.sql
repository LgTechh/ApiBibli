DROP TABLE IF EXISTS LIVRE;
DROP TABLE IF EXISTS AUTEUR;
DROP TABLE IF EXISTS AUTEUR_Livre;
DROP TABLE IF EXISTS LIVRE_CATEGORIE;
DROP TABLE IF EXISTS CATEGORIE;
DROP TABLE IF EXISTS SOUS_CATEGORIE;
DROP TABLE IF EXISTS MEMBRE;
DROP TABLE IF EXISTS EMPRUNT;
DROP TABLE IF EXISTS EXEMPLAIRE;
DROP TABLE IF EXISTS EDITEUR;

CREATE TABLE `LIVRE` (
                         `ID_Livre` integer PRIMARY KEY,
                         `ID_auteur` integer NOT NULL,
                         `ID_categorie` integer NOT NULL,
                         `Titre` varchar(255) NOT NULL,
                         `ISBN` varchar(255) UNIQUE,
                         `Annee_Publication` integer,
                         `Nb_page` smallint NOT NULL,
                         `ID_editeur` integer NOT NULL,
                         FOREIGN KEY (`ID_auteur`) REFERENCES `AUTEUR` (`ID_auteur`),
                         FOREIGN KEY (`ID_categorie`) REFERENCES `CATEGORIE` (`ID_categorie`),
                         FOREIGN KEY (`ID_editeur`) REFERENCES `EDITEUR` (`ID_editeur`)
);

CREATE TABLE `AUTEUR` (
                          `ID_auteur` integer PRIMARY KEY,
                          `Nom` varchar(200) NOT NULL,
                          `Prenom` varchar(200) NOT NULL,
                          `Nationalité` varchar(200) NOT NULL,
                          `Jour_de_naissance` varchar(2),
                          `Mois_de_naissance` varchar(2),
                          `Annee_de_naissance` year(4) NOT NULL
);

CREATE TABLE `AUTEUR_Livre` (
                                `ID_auteur` integer,
                                `ID_Livre` integer,
                                `Role` varchar(200),
                                PRIMARY KEY (`ID_auteur`, `ID_Livre`),
                                FOREIGN KEY (`ID_Livre`) REFERENCES `LIVRE` (`ID_Livre`),
                                FOREIGN KEY (`ID_auteur`) REFERENCES `AUTEUR` (`ID_auteur`)
);

CREATE TABLE `LIVRE_CATEGORIE` (
                                   `ID_Livre` integer,
                                   `ID_categorie` integer,
                                   PRIMARY KEY (`ID_Livre`, `ID_categorie`),
                                   FOREIGN KEY (`ID_Livre`) REFERENCES `LIVRE` (`ID_Livre`),
                                   FOREIGN KEY (`ID_categorie`) REFERENCES `CATEGORIE` (`ID_categorie`)
);

CREATE TABLE `CATEGORIE` (
                             `ID_categorie` integer PRIMARY KEY,
                             `Nom` varchar(200) NOT NULL,
                             `Description` varchar(500) NOT NULL,
                             `Age_cible` integer,
                             `Code_dewey` integer NOT NULL
);

CREATE TABLE `SOUS_CATEGORIE` (
                                  `ID_souscategorie` integer PRIMARY KEY,
                                  `Nom` varchar(200) NOT NULL,
                                  `Description` varchar(500) NOT NULL,
                                  `ID_categorie` integer NOT NULL,
                                  FOREIGN KEY (`ID_categorie`) REFERENCES `CATEGORIE` (`ID_categorie`)
);

CREATE TABLE `MEMBRE` (
                          `ID_Membre` integer PRIMARY KEY,
                          `Nom` varchar(255) NOT NULL,
                          `Prenom` varchar(255) NOT NULL,
                          `Email` varchar(255) UNIQUE
);

CREATE TABLE `EMPRUNT` (
                           `ID_Emprunt` integer PRIMARY KEY,
                           `ID_Membre` integer NOT NULL,
                           `ID_Exemplaire` integer NOT NULL,
                           `Date_Emprunt` date DEFAULT (now()),
                           `Date_Retour_Prevue` date NOT NULL,
                           `Date_Retour_Effective` date NOT NULL,
                           FOREIGN KEY (`ID_Membre`) REFERENCES `MEMBRE` (`ID_Membre`),
                           FOREIGN KEY (`ID_Exemplaire`) REFERENCES `EXEMPLAIRE` (`ID_exemplaire`)
);

CREATE TABLE `EXEMPLAIRE` (
                              `ID_exemplaire` integer PRIMARY KEY,
                              `ID_Livre` integer NOT NULL,
                              `Etat` varchar(500) NOT NULL,
                              `Disponibilite` integer NOT NULL,
                              `date_aquisition` date NOT NULL,
                              FOREIGN KEY (`ID_Livre`) REFERENCES `LIVRE` (`ID_Livre`)
);

CREATE TABLE `EDITEUR` (
                           `ID_editeur` integer PRIMARY KEY,
                           `Nom` varchar(200) NOT NULL
);
