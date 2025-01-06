# API Documentation

Cette documentation décrit les endpoints disponibles pour gérer les Dossiers Patient Informatisés (DPI) et les bilans dans l'application backend.

---

## Base URL

- **Environnement de développement** :  
  `http://127.0.0.1:8000/`



Headers par défaut

À inclure dans toutes les requêtes sauf mention contraire :

    Content-Type: application/json
    Authorization: Token <token>

<token> est obtenu après la connexion et permet d’authentifier les utilisateurs.
Endpoints
1. Créer un DPI

    Endpoint : POST /dpi/creer/
    Description : Permet de créer un Dossier Patient Informatisé (DPI) pour un patient avec génération d'un QR code.

Requête

    Headers :

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
      "medecin_traitant": "<nom_medecin>, <prenom_medecin>",
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
  "medecin_traitant": "<nom_medecin>",
  "etablissement_courant": "<nom_etablissement>",
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
  "medecin_traitant": "<nom_medecin>",
  "etablissement_courant": "<nom_etablissement>",
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

4. Lister tous les DPI

    Endpoint : GET /dpi/listerall/
    Description : Permet de récupérer la liste de tous les Dossiers Patients Informatisés (DPI).

Requête

    Headers :

    Content-Type: application/json  
    Authorization: Token <token> (nécessite un rôle authentifié)

Réponse

    Succès (200) :

[
  {
    "id": <dpi_id>,
    "patient_nom": "<nom_patient>",
    "patient_prenom": "<prenom_patient>",
    "medecin_traitant": {
      "id": <medecin_id>,
      "nom": "<nom_medecin>",
      "prenom": "<prenom_medecin>",
      "specialite": "<specialite_medecin>"
    },
    "etablissement_courant": {
      "id": <etablissement_id>,
      "nom": "<nom_etablissement>",
      "adresse": "<adresse_etablissement>"
    }
  },
  ...
]

Erreur (401) :

    {
      "detail": "Authentification requise."
    }

5. Lister les DPI par Médecin

    Endpoint : GET /dpi/lister-par-medecin/
    Description : Permet de récupérer la liste des DPI filtrée par médecin.

Requête

    Headers :

Content-Type: application/json  
Authorization: Token <token> (nécessite un rôle authentifié)

Query Params :

    medecin_id=<medecin_id>

Réponse

    Succès (200) :

[
  {
    "id": <dpi_id>,
    "patient_nom": "<nom_patient>",
    "patient_prenom": "<prenom_patient>",
    "medecin_traitant": {
      "id": <medecin_id>,
      "nom": "<nom_medecin>",
      "prenom": "<prenom_medecin>",
      "specialite": "<specialite_medecin>"
    },
    "etablissement_courant": {
      "id": <etablissement_id>,
      "nom": "<nom_etablissement>",
      "adresse": "<adresse_etablissement>"
    }
  },
  ...
]













Endpoints des Bilans
1. Demander un bilan

    Endpoint : POST /bilans/demander_bilan/
    Description : Permet à un médecin de demander un bilan.

Requête

    Headers :

Content-Type: application/json  
Authorization: Token <token>

Body :

    {
      "consultation": <id_consultation>,
      "type": "<BIOLOGIQUE|RADIOLOGIQUE>",
      "autres_champs": "<valeurs>"
    }

Réponse

    Succès (200) :

{
  "id": <id_bilan>,
  "status": "EN_COURS",
  "date_demande": "<AAAA-MM-JJ>",
  "graphique": "NON_ATTACHE",
  "autres_champs": "<valeurs>"
}

Erreur (400) :

    {
      "error": "<détails_erreurs>"
    }

2. Consulter les bilans biologiques en cours

    Endpoint : GET /bilans/biologiques/en-cours/
    Description : Permet à un laborantin de voir les bilans biologiques en cours.

Réponse

    Succès (200) :

    [
      {
        "id": <id_bilan>,
        "type": "BIOLOGIQUE",
        "status": "EN_COURS",
        "autres_champs": "<valeurs>"
      },
      ...
    ]

3. Consulter les bilans radiologiques en cours

    Endpoint : GET /bilans/radiologiques/en-cours/
    Description : Permet à un radiologue de voir les bilans radiologiques en cours.

Réponse

    Succès (200) :

    [
      {
        "id": <id_bilan>,
        "type": "RADIOLOGIQUE",
        "status": "EN_COURS",
        "autres_champs": "<valeurs>"
      },
      ...
    ]

4. Saisir le résultat d'un bilan biologique

    Endpoint : POST /bilans/biologiques/resultat/
    Description : Permet à un laborantin d'entrer les résultats d'un bilan biologique.

Requête

    Headers :

Content-Type: application/json  
Authorization: Token <token>

Body :

    {
      "graphique": "<graphique_data>",
      "tests": [
        {
          "bilan": <id_bilan>,
          "valeurs_test": "<valeurs>"
        }
      ]
    }

Réponse

    Succès (200) :

{
  "data": [
    {
      "test_id": <id_test>,
      "valeurs_test": "<valeurs>"
    }
  ]
}

Erreur (400) :

    {
      "tests": "<erreurs_tests>",
      "graphique": "<erreurs_graphique>"
    }

5. Saisir le résultat d'un bilan radiologique

    Endpoint : POST /bilans/radiologiques/resultat/
    Description : Permet à un radiologue d'entrer les résultats d'un bilan radiologique.

Requête

    Headers :

Content-Type: application/json  
Authorization: Token <token>

Body :

    {
      "compterendu": {
        "bilan": <id_bilan>,
        "texte": "<texte_compterendu>"
      },
      "image": {
        "donnee": "<image_base64>"
      }
    }

Réponse

    Succès (200) :

{
  "compte_rendu": {
    "id": <id_compterendu>,
    "texte": "<texte>"
  },
  "image": {
    "id": <id_image>,
    "donnee": "<image_base64>"
  }
}

Erreur (400) :

    {
      "compterendu": "<erreurs_compterendu>",
      "image": "<erreurs_image>"
    }

6. Consulter un bilan biologique

    Endpoint : GET /bilans/biologique/consulter/
    Description : Permet de voir les détails d'un bilan biologique.

Requête

    Headers :

Content-Type: application/json  
Authorization: Token <token>

Body :

    {
      "bilan": <id_bilan>
    }

Réponse

    Succès (200) :

    {
      "bilan": {
        "id": <id_bilan>,
        "status": "<status>",
        "autres_champs": "<valeurs>"
      },
      "tests": [
        {
          "id": <id_test>,
          "valeurs_test": "<valeurs>"
        }
      ]
    }

7. Consulter un bilan radiologique

    Endpoint : GET /bilans/radiologique/consulter/
    Description : Permet de voir les détails d'un bilan radiologique.

Requête

    Headers :

Content-Type: application/json  
Authorization: Token <token>

Body :

    {
      "bilan": <id_bilan>
    }

Réponse

    Succès (200) :

{
  "bilan": {
    "id": <id_bilan>,
    "status": "<status>",
    "autres_champs": "<valeurs>"
  },
  "compterendu": {
    "id": <id_compterendu>,
    "texte": "<texte_compterendu>"
  },
  "image": {
    "id": <id_image>,
    "donnee": "<image_base64>"
  }
}




## Endpoints des Consultations

### 1. Créer une consultation

- **Endpoint** : `POST /consultations/creer/`
- **Description** : Permet de créer une nouvelle consultation pour un patient à partir de son DPI.

#### Requête

- **Headers** :
  ```plaintext
  Content-Type: application/json  
  Authorization: Token <token> (nécessite un rôle Doctor)

    Body :

    {
      "dpi": <dpi_id>,
      "resume": {
        "symptomes": "<symptomes>",
        "diagnostic": "<diagnostic>",
        "conseils": "<conseils>"
      }
    }

Réponse

    Succès (201) :

{
  "message": "Consultation et résumé créés avec succès",
  "consultation": {
    "id": <consultation_id>,
    "dpi": <dpi_id>,
    "medecin_consulte": "<medecin_traitant>",
    "resume": {
      "symptomes": "<symptomes>",
      "diagnostic": "<diagnostic>",
      "conseils": "<conseils>"
    }
  }
}

Erreur (400) :

{
  "error": "Données manquantes"
}

Erreur (404) :

{
  "error": "DPI non trouvé"
}

Erreur (500) :

    {
      "error": "Erreur interne du serveur"
    }

2. Lister les consultations par DPI

    Endpoint : GET /consultations/liste/<int:dpi_id>/
    Description : Permet de récupérer toutes les consultations associées à un DPI spécifique.

Requête

    Headers :

    Content-Type: application/json  
    Authorization: Token <token> (nécessite un rôle authentifié)

Réponse

    Succès (200) :

[
  {
    "id": <consultation_id>,
    "dpi": <dpi_id>,
    "medecin_consulte": "<medecin_traitant>",
    "resume": {
      "symptomes": "<symptomes>",
      "diagnostic": "<diagnostic>",
      "conseils": "<conseils>"
    }
  },
  ...
]

Erreur (404) :

{
  "error": "Aucune consultation trouvée pour ce DPI."
}

Erreur (500) :

{
  "error": "Erreur interne du serveur"
}




## Endpoints des Ordonnances

### 1. Créer une ordonnance

- **Endpoint** : `POST /ordonnances/creer/<int:dpi_id>/`
- **Description** : Permet de créer une nouvelle ordonnance pour un patient en spécifiant l'ID de la consultation.

#### Requête

- **Headers** :
  ```plaintext
  Content-Type: application/json  
  Authorization: Token <token> (nécessite un rôle Doctor)

    Body :

    {
      "medicament": <medicament_id>,
      "quantite": <quantite>,
      "posologie": "<posologie>"
    }

Réponse

    Succès (201) :

{
  "id": <ordonnance_id>,
  "medicament": <medicament_id>,
  "quantite": <quantite>,
  "posologie": "<posologie>"
}

Erreur (400) :

    {
      "error": "Erreur de validation des données"
    }

2. Lister les ordonnances par consultation

    Endpoint : GET /ordonnances/liste/<int:consultation_id>/
    Description : Récupère toutes les ordonnances liées à une consultation spécifique.

Requête

    Headers :

    Content-Type: application/json  
    Authorization: Token <token> (nécessite un rôle authentifié)

Réponse

    Succès (200) :

[
  {
    "id": <ordonnance_id>,
    "medicament": <medicament_id>,
    "quantite": <quantite>,
    "posologie": "<posologie>"
  },
  ...
]

Erreur (404) :

{
  "error": "Aucune ordonnance trouvée pour cette consultation."
}

Erreur (500) :

    {
      "error": "Erreur interne du serveur"
    }

3. Lister les ordonnances par DPI

    Endpoint : GET /ordonnances/liste/<int:dpi_id>/
    Description : Récupère toutes les ordonnances liées à un DPI spécifique.

Requête

    Headers :

    Content-Type: application/json  
    Authorization: Token <token> (nécessite un rôle authentifié)

Réponse

    Succès (200) :

[
  {
    "id": <ordonnance_id>,
    "medicament": <medicament_id>,
    "quantite": <quantite>,
    "posologie": "<posologie>"
  },
  ...
]

Erreur (404) :

{
  "error": "Aucune ordonnance trouvée pour ce DPI."
}

Erreur (500) :

    {
      "error": "Erreur interne du serveur"
    }

4. Lister tous les médicaments disponibles

    Endpoint : GET /medicaments/
    Description : Récupère tous les médicaments disponibles dans le système.

Requête

    Headers :

    Content-Type: application/json  
    Authorization: Token <token> (optionnel selon la configuration)

Réponse

    Succès (200) :

[
  {
    "id": <medicament_id>,
    "nom": "<nom_medicament>",
    "description": "<description>",
    "prix": <prix>
  },
  ...
]

Erreur (404) :

{
  "error": "Aucun médicament trouvé."
}

Erreur (500) :

    {
      "error": "Erreur interne du serveur"
    }

5. Valider une ordonnance

    Endpoint : PATCH /ordonnances/valider/<int:ordonnance_id>/
    Description : Valide une ordonnance en changeant son statut à "Validé".

Requête

    Headers :

    Content-Type: application/json  
    Authorization: Token <token> (optionnel selon la configuration)

Réponse

    Succès (200) :

{
  "id": <ordonnance_id>,
  "status": "Validé"
}

Erreur (404) :

{
  "error": "Ordonnance non trouvée."
}

Erreur (500) :

    {
      "error": "Erreur interne du serveur"
    }

6. Récupérer les détails d'une ordonnance

    Endpoint : GET /ordonnances/details/<int:ordonnance_id>/
    Description : Récupère les détails d'une ordonnance, y compris ses traitements et les médicaments associés.

Requête

    Headers :

    Content-Type: application/json  
    Authorization: Token <token> (nécessite un rôle authentifié)

Réponse

    Succès (200) :

{
  "id": <ordonnance_id>,
  "medicament": {
    "id": <medicament_id>,
    "nom": "<nom_medicament>"
  },
  "quantite": <quantite>,
  "posologie": "<posologie>"
}

Erreur (404) :

{
  "error": "Ordonnance non trouvée."
}

Erreur (500) :

{
  "error": "Erreur interne du serveur"
}





## Endpoints des Soins

### 1. Créer un soin

- **Endpoint** : `POST /soins/creer/`
- **Description** : Permet de créer un soin pour un patient par un infirmier.

#### Requête

- **Headers** :
  ```plaintext
  Content-Type: application/json  
  Authorization: Token <token> (nécessite un rôle Infirmier)

    Body :

    {
      "dpi": <dpi_id>,
      "infermier": <infermier_id>,
      "description": "<description_du_soin>",
      "date_soin": "<date_heure>"
    }

Réponse

    Succès (201) :

{
  "id": <soin_id>,
  "dpi": <dpi_id>,
  "infermier": <infermier_id>,
  "description": "<description_du_soin>",
  "date_soin": "<date_heure>"
}

Erreur (400) :

{
  "error": "Erreur de validation des données"
}

Erreur (404) :

    {
      "error": "DPI ou Infirmier non trouvé"
    }

2. Lister les soins par DPI

    Endpoint : GET /soins/liste/<int:dpi_id>/
    Description : Récupère tous les soins liés à un DPI spécifique.

Requête

    Headers :

    Content-Type: application/json  
    Authorization: Token <token> (nécessite un rôle authentifié)

Réponse

    Succès (200) :

[
  {
    "id": <soin_id>,
    "dpi": <dpi_id>,
    "infermier": <infermier_id>,
    "description": "<description_du_soin>",
    "date_soin": "<date_heure>"
  },
  ...
]

Erreur (404) :

{
  "error": "Aucun soin trouvé pour ce DPI."
}

Erreur (500) :

    {
      "error": "Erreur interne du serveur"
    }

3. Modifier le statut d'un soin

    Endpoint : PATCH /soins/modifier/<int:pk>/
    Description : Permet de modifier le statut d'un soin existant.

Requête

    Headers :

Content-Type: application/json  
Authorization: Token <token> (nécessite un rôle Infirmier)

Body :

    {
      "status": "<nouveau_statut>"
    }

Réponse

    Succès (200) :

{
  "id": <soin_id>,
  "dpi": <dpi_id>,
  "infermier": <infermier_id>,
  "description": "<description_du_soin>",
  "date_soin": "<date_heure>",
  "status": "<nouveau_statut>"
}

Erreur (400) :

{
  "error": "Statut invalide"
}

Erreur (404) :

    {
      "error": "Soin non trouvé"
    }









## Endpoints des Utilisateurs

### 1. Authentifier un utilisateur

- **Endpoint** : `POST /authentifier_utilisateur/`
- **Description** : Permet d'authentifier un utilisateur avec son nom d'utilisateur et son mot de passe.

#### Requête

- **Headers** :
  ```plaintext
  Content-Type: application/json

Body :

{
  "username": "<nom_utilisateur>",
  "password": "<mot_de_passe>"
}

Réponse

Succès (200) :

{
  "token": "<jeton_d_authentification>",
  "user": {
    "id": <utilisateur_id>,
    "username": "<nom_utilisateur>",
    "role": "<role_utilisateur>"
  }
}

Erreur (400) :

{
  "error": "Nom d'utilisateur ou mot de passe incorrect"
}

2. Inscrire un utilisateur

    Endpoint : POST /inscrire_utilisateur/
    Description : Permet de créer un nouvel utilisateur.

Requête

    Headers :

Content-Type: application/json

Body :

    {
      "username": "<nom_utilisateur>",
      "password": "<mot_de_passe>"
    }

Réponse

Succès (200) :

{
  "token": "<jeton_d_authentification>",
  "user": {
    "id": <utilisateur_id>,
    "username": "<nom_utilisateur>",
    "role": "<role_utilisateur>"
  }
}

Erreur (400) :

{
  "error": "Erreur dans la création de l'utilisateur"
}

3. Déconnecter un utilisateur

    Endpoint : POST /deconnecter_utilisateur/
    Description : Permet de déconnecter un utilisateur en supprimant son jeton d'authentification.

Requête

    Headers :

    Content-Type: application/json
    Authorization: Token <token> (nécessite un utilisateur authentifié)

Réponse

Succès (200) :

{
  "message": "Déconnexion réussie"
}

Erreur (400) :

{
  "error": "Erreur de déconnexion"
}

4. Obtenir l'utilisateur connecté

    Endpoint : GET /obtenir_utilisateur_connecte/
    Description : Récupère les informations de l'utilisateur actuellement connecté.

Requête

    Headers :

    Content-Type: application/json
    Authorization: Token <token> (nécessite un utilisateur authentifié)

Réponse

Succès (200) :

{
  "id": <utilisateur_id>,
  "username": "<nom_utilisateur>",
  "role": "<role_utilisateur>"
}

Erreur (400) :

{
  "error": "Utilisateur non trouvé"
}

5. Créer un patient

    Endpoint : POST /creer_patient/
    Description : Permet à un superutilisateur de créer un nouveau patient.

Requête

    Headers :

Content-Type: application/json
Authorization: Token <token> (nécessite un rôle Superutilisateur)

Body :

    {
      "nom": "<nom_patient>",
      "prenom": "<prenom_patient>"
    }

Réponse

Succès (200) :

{
  "id": <patient_id>,
  "nom": "<nom_patient>",
  "prenom": "<prenom_patient>",
  "username": "<nom_utilisateur>",
  "token": "<jeton_d_authentification>"
}

Erreur (400) :

{
  "error": "Erreur dans la création du patient"
}

6. Créer un médecin

    Endpoint : POST /creer_medcin/
    Description : Permet à un superutilisateur de créer un nouveau médecin.

Requête

    Headers :

Content-Type: application/json
Authorization: Token <token> (nécessite un rôle Superutilisateur)

Body :

    {
      "nom": "<nom_medecin>",
      "prenom": "<prenom_medecin>"
    }

Réponse

Succès (200) :

{
  "id": <medecin_id>,
  "nom": "<nom_medecin>",
  "prenom": "<prenom_medecin>",
  "username": "<nom_utilisateur>",
  "token": "<jeton_d_authentification>"
}

Erreur (400) :

{
  "error": "Erreur dans la création du médecin"
}

7. Consulter le profil d'un patient

    Endpoint : GET /consulter_profil_patient/<int:patient_id>/
    Description : Récupère les informations d'un patient spécifique.

Requête

    Headers :

    Content-Type: application/json
    Authorization: Token <token> (nécessite un rôle authentifié)

Réponse

Succès (200) :

{
  "id": <patient_id>,
  "nom": "<nom_patient>",
  "prenom": "<prenom_patient>",
  "username": "<nom_utilisateur>"
}

Erreur (404) :

{
  "error": "Patient non trouvé"
}

8. Consulter le profil d'un médecin

    Endpoint : GET /consulter_profil_medcin/<int:medecin_id>/
    Description : Récupère les informations d'un médecin spécifique.

Requête

    Headers :

    Content-Type: application/json
    Authorization: Token <token> (nécessite un rôle authentifié)

Réponse

Succès (200) :

{
  "id": <medecin_id>,
  "nom": "<nom_medecin>",
  "prenom": "<prenom_medecin>",
  "username": "<nom_utilisateur>"
}

Erreur (404) :

{
  "error": "Médecin non trouvé"
}

