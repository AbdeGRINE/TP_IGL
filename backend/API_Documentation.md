# API Documentation

Cette documentation décrit les endpoints disponibles pour gérer les DPI (Dossier Patient Informatisé) dans l'application backend.

---

## Base URL

- **Environnement de développement** :  
  `http://127.0.0.1:8000/`

---

## Headers par défaut

À inclure dans toutes les requêtes sauf mention contraire :

- `Content-Type: application/json`
- `Authorization: Token <token>`

`<token>` est obtenu après la connexion et permet d’authentifier les utilisateurs.

---

## Endpoints

### 1. Créer un DPI

- **Endpoint** : `POST /dpi/creer/`
- **Description** : Permet de créer un Dossier Patient Informatisé (DPI) pour un patient avec génération d'un QR code.

#### Requête

- **Headers** :
  ```plaintext
  Content-Type: application/json  
  Authorization: Token <token> (nécessite un rôle Doctor ou Admin)

    Body :

    {
      "patient": {
        "nss": "<numéro de sécurité sociale>",
        "nom": "<nom>",
        "prenom": "<prénom>",
        "date_naissance": "<AAAA-MM-JJ>",
        "adresse": "<adresse>",
        "mutuelle": "<nom de la mutuelle>"
      },
      "medecin_traitant": <id_medecin>,
      "etablissement_courant": <id_etablissement>,
      "personne_a_contacter": {
        "nom": "<nom_contact>",
        "prenom": "<prenom_contact>"
      }
    }

Réponse

    Succès (201) :

{
  "success": "DPI créé pour le patient <nom> <prénom>.",
  "qr_code": "<qr_code_base64>"
}

Erreur (400) :

    {
      "error": "Données incomplètes."
    }

2. Consulter un DPI

    Endpoint : GET /dpi/consulter-dpi/<int:dpi_id>/
    Description : Récupère les informations d’un DPI spécifique.

Requête

    Headers :

    Content-Type: application/json  
    Authorization: Token <token> (nécessite un rôle Doctor ou Patient)

Réponse

    Succès (200) :

{
  "id": <dpi_id>,
  "medecin_traitant": <nom_medecin>,
  "etablissement_courant": <nom_etablissement>,
  "patient": {
    "nss": "<nss>",
    "nom": "<nom>",
    "prenom": "<prénom>",
    "date_naissance": "<AAAA-MM-JJ>",
    "adresse": "<adresse>",
    "mutuelle": "<nom de la mutuelle>",
    "personne_a_contacter": {
      "nom": "<nom_contact>",
      "prenom": "<prenom_contact>"
    }
  },
  "qr_code": "<qr_code_base64>"
}

Erreur (404) :

    {
      "error": "Aucun DPI trouvé avec cet identifiant."
    }

3. Rechercher un DPI par NSS

    Endpoint : GET /dpi/rechercher-dpi/
    Description : Permet de rechercher un DPI en utilisant le NSS du patient.

Requête

    Headers :

Content-Type: application/json  
Authorization: Token <token> (nécessite un rôle Doctor ou Patient)

Query Params :

    nss=<numéro de sécurité sociale>

Réponse

    Succès (200) :

{
  "id": <dpi_id>,
  "medecin_traitant": <nom_medecin>,
  "etablissement_courant": <nom_etablissement>,
  "patient": {
    "nss": "<nss>",
    "nom": "<nom>",
    "prenom": "<prénom>",
    "date_naissance": "<AAAA-MM-JJ>",
    "adresse": "<adresse>",
    "mutuelle": "<nom de la mutuelle>",
    "personne_a_contacter": {
      "nom": "<nom_contact>",
      "prenom": "<prenom_contact>"
    }
  },
  "qr_code": "<qr_code_base64>"
}

Erreur (400) :

{
  "error": "NSS non fourni."
}

Erreur (404) :

{
  "error": "Aucun patient trouvé avec ce NSS."
}