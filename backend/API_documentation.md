# API Documentation

This documentation describes the available endpoints for managing Computerized Patient Records (DPI).

---

## Base URL

- **Development Environment**: `http://127.0.0.1:8000/`

## Default Headers

To be included in all requests unless otherwise stated:

Content-Type: application/json
Authorization: Token <token>
`<token>` is obtained after login and authenticates users.

## Endpoints:

### 1. Create a DPI

- **Endpoint**: `POST /dpi/creer/`
- **Description**: Creates a Computerized Patient Record (DPI) for a patient with QR code generation.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires Doctor or Admin role)
    ```
- **Body**:
    ```json
    {
      "patient": {
        "nss": "<social security number>",
        "nom": "<last name>",
        "prenom": "<first name>",
        "date_naissance": "<YYYY-MM-DD>",
        "adresse": "<address>",
        "mutuelle": "<health insurance name>"
      },
      "medecin_traitant": "<doctor's last name>, <doctor's first name>",
      "personne_a_contacter": "personne_a_contacter"
    }
    ```

#### Response

- **Success (201)**:
    ```json
    {
      "success": "DPI created for patient <last name> <first name>.",
      "qr_code": "<base64 encoded qr_code>"
    }
    ```
- **Error (400)**:
    ```json
    {
      "error": "Incomplete data."
    }
    ```

### 2. Consult a DPI

- **Endpoint**: `GET /dpi/consulter-dpi/<int:dpi_id>/`
- **Description**: Retrieves information for a specific DPI.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires Doctor or Patient role)
    ```

#### Response

- **Success (200)**:
    ```json
    {
      "id": <dpi_id>,
      "medecin_traitant": "<doctor's last name>",
      "etablissement_courant": "<institution name>",
      "patient": {
        "nss": "<nss>",
        "nom": "<last name>",
        "prenom": "<first name>",
        "date_naissance": "<YYYY-MM-DD>",
        "adresse": "<address>",
        "mutuelle": "<health insurance name>",
        "personne_a_contacter": {
          "nom": "<contact last name>",
          "prenom": "<contact first name>"
        }
      },
      "qr_code": "<base64 encoded qr_code>"
    }
    ```
- **Error (404)**:
    ```json
    {
      "error": "No DPI found with this ID."
    }
    ```

### 3. Search for a DPI by NSS

- **Endpoint**: `GET /dpi/rechercher-dpi/`
- **Description**: Searches for a DPI using the patient's NSS.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires Doctor or Patient role)
    ```
- **Query Params**:
    `nss=<social security number>`

#### Response

- **Success (200)**:
    ```json
    {
      "id": <dpi_id>,
      "medecin_traitant": "<doctor's last name>",
      "etablissement_courant": "<institution name>",
      "patient": {
        "nss": "<nss>",
        "nom": "<last name>",
        "prenom": "<first name>",
        "date_naissance": "<YYYY-MM-DD>",
        "adresse": "<address>",
        "mutuelle": "<health insurance name>",
        "personne_a_contacter": {
          "nom": "<contact last name>",
          "prenom": "<contact first name>"
        }
      },
      "qr_code": "<base64 encoded qr_code>"
    }
    ```
- **Error (400)**:
    ```json
    {
      "error": "NSS not provided."
    }
    ```
- **Error (404)**:
    ```json
    {
      "error": "No patient found with this NSS."
    }
    ```

### 4. List all DPIs

- **Endpoint**: `GET /dpi/listerall/`
- **Description**: Retrieves a list of all Computerized Patient Records (DPIs).

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires authenticated role)
    ```

#### Response

- **Success (200)**:
    ```json
    [
      {
        "id": <dpi_id>,
        "patient_nom": "<patient last name>",
        "patient_prenom": "<patient first name>",
        "medecin_traitant": {
          "id": <doctor_id>,
          "nom": "<doctor's last name>",
          "prenom": "<doctor's first name>",
          "specialite": "<doctor's specialty>"
        },
        "etablissement_courant": {
          "id": <institution_id>,
          "nom": "<institution name>",
          "adresse": "<institution address>"
        },
        "date_creation": "date_creation"
      },
      ...
    ]
    ```
- **Error (401)**:
    ```json
    {
      "detail": "Authentication required."
    }
    ```

### 5. List DPIs by Doctor

- **Endpoint**: `GET /dpi/lister_par_medecin/<int:medecin_id>/`
- **Description**: Retrieves a list of DPIs filtered by doctor.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires authenticated role)
    ```
- **Query Params**:
    `medecin_id=<doctor_id>`

#### Response

- **Success (200)**:
    ```json
    [
      {
        "id": <dpi_id>,
        "patient_nom": "<patient last name>",
        "patient_prenom": "<patient first name>",
        "medecin_traitant": {
          "id": <doctor_id>,
          "nom": "<doctor's last name>",
          "prenom": "<doctor's first name>",
          "specialite": "<doctor's specialty>"
        },
        "etablissement_courant": {
          "id": <institution_id>,
          "nom": "<institution name>",
          "adresse": "<institution address>"
        },
        "date_creation": "date_creation"
      },
      ...
    ]
    ```

### 6. List DPIs by Biological

- **Endpoint**: `GET /dpi/biologique/`
- **Description**: Retrieves a list of DPIs filtered by biological.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires authenticated role)
    ```
- **Query Params**: (None specified in original doc)

#### Response

- **Success (200)**:
    ```json
    [
      {
        "id": <dpi_id>,
        "patient_nom": "<patient last name>",
        "patient_prenom": "<patient first name>",
        "medecin_traitant": {
          "id": <doctor_id>,
          "nom": "<doctor's last name>",
          "prenom": "<doctor's first name>",
          "specialite": "<doctor's specialty>"
        },
        "etablissement_courant": {
          "id": <institution_id>,
          "nom": "<institution name>",
          "adresse": "<institution address>"
        },
        "date_creation": "date_creation"
      },
      ...
    ]
    ```








### 7. List DPIs by Radiological

- **Endpoint**: `GET /dpi/radiologique/`
- **Description**: Retrieves a list of DPIs filtered by radiological.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires authenticated role)
    ```
- **Query Params**: (None specified in original doc)

#### Response

- **Success (200)**:
    ```json
    [
      {
        "id": <dpi_id>,
        "patient_nom": "<patient last name>",
        "patient_prenom": "<patient first name>",
        "medecin_traitant": {
          "id": <doctor_id>,
          "nom": "<doctor's last name>",
          "prenom": "<doctor's first name>",
          "specialite": "<doctor's specialty>"
        },
        "etablissement_courant": {
          "id": <institution_id>,
          "nom": "<institution name>",
          "adresse": "<institution address>"
        },
        "date_creation": "date_creation"
      },
      ...
    ]
    ```

## Endpoints for Assessments (Bilans)

### 1. Request an Assessment

- **Endpoint**: `POST /bilan/demander_bilan/`
- **Description**: Allows a doctor to request an assessment.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token>
    ```
- **Body**:
    ```json
    {
      "consultation": <consultation_id>,
      "type": "<BIOLOGIQUE|RADIOLOGIQUE>",
      "autres_champs": "<values>"
    }
    ```

#### Response

- **Success (200)**:
    ```json
    {
      "id": <assessment_id>,
      "status": "EN_COURS",
      "date_demande": "<YYYY-MM-DD>",
      "graphique": "NON_ATTACHE",
      "autres_champs": "<values>"
    }
    ```
- **Error (400)**:
    ```json
    {
      "error": "<error_details>"
    }
    ```

### 2. Consult Ongoing Biological Assessments

- **Endpoint**: `GET /bilan/consulter_bilans_biologiques_en_cours/`
- **Description**: Allows a lab technician to view ongoing biological assessments.

#### Response

- **Success (200)**:
    ```json
    [
      {
        "id": <assessment_id>,
        "type": "BIOLOGIQUE",
        "status": "EN_COURS",
        "autres_champs": "<values>"
      },
      ...
    ]
    ```

### 3. Consult Ongoing Radiological Assessments

- **Endpoint**: `GET /bilan/consulter_bilans_radiologiques_en_cours/`
- **Description**: Allows a radiologist to view ongoing radiological assessments.

#### Response

- **Success (200)**:
    ```json
    [
      {
        "id": <assessment_id>,
        "type": "RADIOLOGIQUE",
        "status": "EN_COURS",
        "autres_champs": "<values>"
      },
      ...
    ]
    ```

### 4. Enter Biological Assessment Results

- **Endpoint**: `POST /bilan/saisir_resultat_bilan_biologique/`
- **Description**: Allows a lab technician to enter the results of a biological assessment.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token>
    ```
- **Body**:
    ```json
    {
      "graphique": "<graph_data>",
      "tests": [
        {
          "bilan": <assessment_id>,
          "valeurs_test": "<values>"
        }
      ]
    }
    ```

#### Response

- **Success (200)**:
    ```json
    {
      "data": [
        {
          "test_id": <test_id>,
          "valeurs_test": "<values>"
        }
      ]
    }
    ```
- **Error (400)**:
    ```json
    {
      "tests": "<test_errors>",
      "graphique": "<graph_errors>"
    }
    ```

### 5. Enter Radiological Assessment Results

- **Endpoint**: `POST /bilan/saisir_resultat_bilan_radiologique/`
- **Description**: Allows a radiologist to enter the results of a radiological assessment.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token>
    ```
- **Body**:
    ```json
    {
      "compterendu": {
        "bilan": <assessment_id>,
        "texte": "<report_text>"
      },
      "image": {
        "donnee": "<base64_encoded_image>"
      }
    }
    ```

#### Response

- **Success (200)**:
    ```json
    {
      "compte_rendu": {
        "id": <report_id>,
        "texte": "<text>"
      },
      "image": {
        "id": <image_id>,
        "donnee": "<base64_encoded_image>"
      }
    }
    ```
- **Error (400)**:
    ```json
    {
      "compterendu": "<report_errors>",
      "image": "<image_errors>"
    }
    ```

### 6. Consult a Biological Assessment

- **Endpoint**: `GET /bilan/consulter_bilan_biologique/`
- **Description**: Allows viewing the details of a biological assessment.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token>
    ```
- **Body**:
    ```json
    {
      "bilan": <assessment_id>
    }
    ```

#### Response

- **Success (200)**:
    ```json
    {
      "bilan": {
        "id": <assessment_id>,
        "status": "<status>",
        "autres_champs": "<values>"
      },
      "tests": [
        {
          "id": <test_id>,
          "valeurs_test": "<values>"
        }
      ]
    }
    ```

### 7. Consult a Radiological Assessment

- **Endpoint**: `GET /bilan/consulter_bilan_radiologique/`
- **Description**: Allows viewing the details of a radiological assessment.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token>
    ```
- **Body**:
    ```json
    {
      "bilan": <assessment_id>
    }
    ```

#### Response

- **Success (200)**:
    ```json
    {
      "bilan": {
        "id": <assessment_id>,
        "status": "<status>",
        "autres_champs": "<values>"
      },
      "compterendu": {
        "id": <report_id>,
        "texte": "<report_text>"
      },
      "image": {
        "id": <image_id>,
        "donnee": "<base64_encoded_image>"
      }
    }
    ```









### 8. Send Graph Data

- **Endpoint**: `GET /bilan/envoyer_donnees_graphes/`
- **Description**: Retrieves data for biological tests associated with a given DPI, including attached graphs.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires authenticated role)
    ```
- **Body**:
    ```json
    {
      "dpi": <dpi_id>
    }
    ```
- **Query Params**: None required.

#### Response

- **Success (200)**:
    ```json
    [
      {
        "id": <test_id>,
        "nom": "<test_name>",
        "resultat": "<test_result>",
        "unite": "<test_unit>",
        "valeur_reference": "<reference_value>",
        "bilan": {
          "id": <assessment_id>,
          "nom": "<assessment_name>",
          "type": "<assessment_type>"
        }
      },
      ...
    ]
    ```
- **Error (400)**:
    ```json
    {
      "detail": "no graphs attached"
    }
    ```
- **Error (404)**:
    ```json
    {
      "detail": "DPI not found"
    }
    ```

### 9. Consult Assessments of a Consultation

- **Endpoint**: `GET /bilan/consulter-bilans/`
- **Description**: Retrieves the assessments associated with a given consultation.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires authenticated role)
    ```
- **Body**:
    ```json
    {
      "consultation": <consultation_id>
    }
    ```
- **Query Params**: None required.

#### Response

- **Success (200)**:
    ```json
    [
      {
        "id": <assessment_id>,
        "nom": "<assessment_name>",
        "type": "<assessment_type>",
        "date_creation": "<assessment_creation_date>",
        "resultat": "<assessment_result>"
      },
      ...
    ]
    ```
- **Error (400)**:
    ```json
    {
      "detail": "No assessments found for this consultation"
    }
    ```
- **Error (404)**:
    ```json
    {
      "detail": "Consultation not found"
    }
    ```

## Endpoints for Consultations

### 1. Create a Consultation

- **Endpoint**: `POST /consultation/creer/`
- **Description**: Creates a new consultation for a patient from their DPI.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires Doctor role)
    ```
- **Body**:
    ```json
    {
      "dpi": <dpi_id>,
      "resume": {
        "symptomes": "<symptoms>",
        "diagnostic": "<diagnosis>",
        "conseils": "<advice>"
      }
    }
    ```

#### Response

- **Success (201)**:
    ```json
    {
      "message": "Consultation and summary created successfully",
      "consultation": {
        "id": <consultation_id>,
        "dpi": <dpi_id>,
        "medecin_consulte": "<treating_doctor>",
        "resume": {
          "symptomes": "<symptoms>",
          "diagnostic": "<diagnosis>",
          "conseils": "<advice>"
        }
      }
    }
    ```
- **Error (400)**:
    ```json
    {
      "error": "Missing data"
    }
    ```
- **Error (404)**:
    ```json
    {
      "error": "DPI not found"
    }
    ```
- **Error (500)**:
    ```json
    {
      "error": "Internal server error"
    }
    ```

### 2. List Consultations by DPI

- **Endpoint**: `GET /consultation/dpi/<int:dpi_id>/`
- **Description**: Retrieves all consultations associated with a specific DPI.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires authenticated role)
    ```

#### Response

- **Success (200)**:
    ```json
    [
      {
        "id": <consultation_id>,
        "dpi": <dpi_id>,
        "medecin_consulte": "<treating_doctor>",
        "resume": {
          "symptomes": "<symptoms>",
          "diagnostic": "<diagnosis>",
          "conseils": "<advice>"
        }
      },
      ...
    ]
    ```
- **Error (404)**:
    ```json
    {
      "error": "No consultations found for this DPI."
    }
    ```

## Endpoints for Prescriptions (Ordonnances)

### 1. Create a Prescription

- **Endpoint**: `POST /ordonnance/creer/`
- **Description**: Creates a new prescription for a patient, specifying the consultation ID.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires Doctor role)
    ```
- **Body**:
    ```json
    {
      "medicament": <medicament_id>,
      "quantite": <quantity>,
      "posologie": "<dosage>"
    }
    ```

#### Response

- **Success (201)**:
    ```json
    {
      "id": <prescription_id>,
      "medicament": <medicament_id>,
      "quantite": <quantity>,
      "posologie": "<dosage>"
    }
    ```
- **Error (400)**:
    ```json
    {
      "error": "Data validation error"
    }
    ```

### 2. List Prescriptions by Consultation

- **Endpoint**: `GET /ordonnance/consultation/<int:consultation_id>/`
- **Description**: Retrieves all prescriptions linked to a specific consultation.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires authenticated role)
    ```

#### Response

- **Success (200)**:
    ```json
    [
      {
        "id": <prescription_id>,
        "medicament": <medicament_id>,
        "quantite": <quantity>,
        "posologie": "<dosage>"
      },
      ...
    ]
    ```
- **Error (404)**:
    ```json
    {
      "error": "No prescriptions found for this consultation."
    }
    ```
- **Error (500)**:
    ```json
    {
      "error": "Internal server error"
    }
    ```

### 3. List Prescriptions by DPI

- **Endpoint**: `GET /ordonnance/dpi/<int:dpi_id>/`
- **Description**: Retrieves all prescriptions linked to a specific DPI.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires authenticated role)
    ```

#### Response

- **Success (200)**:
    ```json
    [
      {
        "id": <prescription_id>,
        "medicament": <medicament_id>,
        "quantite": <quantity>,
        "posologie": "<dosage>"
      },
      ...
    ]
    ```
- **Error (404)**:
    ```json
    {
      "error": "No prescriptions found for this DPI."
    }
    ```
- **Error (500)**:
    ```json
    {
      "error": "Internal server error"
    }
    ```



### 4. List All Available Medications

- **Endpoint**: `GET /ordonnance/<int:ordonnance_id>/`  *(This endpoint path seems incorrect.  It should likely be something like `/ordonnance/medicaments/` or similar.)*
- **Description**: Retrieves all available medications in the system.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (optional, depending on configuration)
    ```

#### Response

- **Success (200)**:
    ```json
    [
      {
        "id": <medicament_id>,
        "nom": "<medication_name>",
        "description": "<description>",
        "prix": <price>
      },
      ...
    ]
    ```
- **Error (404)**:
    ```json
    {
      "error": "No medication found."
    }
    ```
- **Error (500)**:
    ```json
    {
      "error": "Internal server error"
    }
    ```

### 5. Validate a Prescription

- **Endpoint**: `PATCH /ordonnance/<int:ordonnance_id>/valider/`
- **Description**: Validates a prescription by changing its status to "Validated".

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (optional, depending on configuration)
    ```

#### Response

- **Success (200)**:
    ```json
    {
      "id": <prescription_id>,
      "status": "Validated"
    }
    ```
- **Error (404)**:
    ```json
    {
      "error": "Prescription not found."
    }
    ```
- **Error (500)**:
    ```json
    {
      "error": "Internal server error"
    }
    ```

### 6. Retrieve Prescription Details

- **Endpoint**: `GET /ordonnance/choix_medicaments/` *(This endpoint path also seems unusual. It might be better as something like `/ordonnance/<int:ordonnance_id>/details`)*
- **Description**: Retrieves the details of a prescription, including its treatments and associated medications.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires authenticated role)
    ```

#### Response

- **Success (200)**:
    ```json
    {
      "id": <prescription_id>,
      "medicament": {
        "id": <medicament_id>,
        "nom": "<medication_name>"
      },
      "quantite": <quantity>,
      "posologie": "<dosage>"
    }
    ```
- **Error (404)**:
    ```json
    {
      "error": "Prescription not found."
    }
    ```
- **Error (500)**:
    ```json
    {
      "error": "Internal server error"
    }
    ```

## Endpoints for Care (Soins)

### 1. Create Care

- **Endpoint**: `POST /soin/creer/`
- **Description**: Creates care for a patient by a nurse.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires Nurse role)
    ```
- **Body**:
    ```json
    {
      "dpi": <dpi_id>,
      "infermier": <nurse_id>,
      "description": "<care_description>",
      "date_soin": "<date_time>"
    }
    ```

#### Response

- **Success (201)**:
    ```json
    {
      "id": <care_id>,
      "dpi": <dpi_id>,
      "infermier": <nurse_id>,
      "description": "<care_description>",
      "date_soin": "<date_time>"
    }
    ```
- **Error (400)**:
    ```json
    {
      "error": "Data validation error"
    }
    ```
- **Error (404)**:
    ```json
    {
      "error": "DPI or Nurse not found"
    }
    ```

### 2. List Care by DPI

- **Endpoint**: `GET /soin/dpi/<int:dpi_id>/`
- **Description**: Retrieves all care linked to a specific DPI.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires authenticated role)
    ```

#### Response

- **Success (200)**:
    ```json
    [
      {
        "id": <care_id>,
        "dpi": <dpi_id>,
        "infermier": <nurse_id>,
        "description": "<care_description>",
        "date_soin": "<date_time>"
      },
      ...
    ]
    ```
- **Error (404)**:
    ```json
    {
      "error": "No care found for this DPI."
    }
    ```
- **Error (500)**:
    ```json
    {
      "error": "Internal server error"
    }
    ```

### 3. Modify Care Status

- **Endpoint**: `PATCH /soin/<int:pk>/modifier-status/`
- **Description**: Modifies the status of existing care.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires Nurse role)
    ```
- **Body**:
    ```json
    {
      "status": "<new_status>"
    }
    ```

#### Response

- **Success (200)**:
    ```json
    {
      "id": <care_id>,
      "dpi": <dpi_id>,
      "infermier": <nurse_id>,
      "description": "<care_description>",
      "date_soin": "<date_time>",
      "status": "<new_status>"
    }
    ```
- **Error (400)**:
    ```json
    {
      "error": "Invalid status"
    }
    ```
- **Error (404)**:
    ```json
    {
      "error": "Care not found"
    }
    ```

## Endpoints for Users

### 1. Authenticate User

- **Endpoint**: `POST /users/authentifier_utilisateur/`
- **Description**: Authenticates a user with their username and password.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    ```
- **Body**:
    ```json
    {
      "username": "<username>",
      "password": "<password>"
    }
    ```

#### Response

- **Success (200)**:
    ```json
    {
      "token": "<authentication_token>",
      "user": {
        "id": <user_id>,
        "username": "<username>",
        "role": "<user_role>"
      }
    }
    ```
- **Error (400)**:
    ```json
    {
      "error": "Incorrect username or password"
    }
    ```

### 2. Register User

- **Endpoint**: `POST /users/inscrire_utilisateur/`
- **Description**: Creates a new user.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    ```
- **Body**:
    ```json
    {
      "username": "<username>",
      "password": "<password>"
    }
    ```

#### Response

- **Success (200)**:
    ```json
    {
      "token": "<authentication_token>",
      "user": {
        "id": <user_id>,
        "username": "<username>",
        "role": "<user_role>"
      }
    }
    ```
- **Error (400)**:
    ```json
    {
      "error": "Error in user creation"
    }
    ```





### 3. Disconnect User

- **Endpoint**: `POST /users/deconnecter_utilisateur/`
- **Description**: Disconnects a user by removing their authentication token.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires authenticated user)
    ```

#### Response

- **Success (200)**:
    ```json
    {
      "message": "Successful logout"
    }
    ```
- **Error (400)**:
    ```json
    {
      "error": "Logout error"
    }
    ```

### 4. Get Connected User

- **Endpoint**: `GET /users/obtenir_utilisateur_connecte/`
- **Description**: Retrieves information about the currently connected user.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires authenticated user)
    ```

#### Response

- **Success (200)**:
    ```json
    {
      "id": <user_id>,
      "username": "<username>",
      "role": "<user_role>"
    }
    ```
- **Error (400)**:
    ```json
    {
      "error": "User not found"
    }
    ```

### 5. Create Patient

- **Endpoint**: `POST /users/creer_patient/`
- **Description**: Allows a superuser to create a new patient.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires Superuser role)
    ```
- **Body**:
    ```json
    {
      "nom": "<patient_last_name>",
      "prenom": "<patient_first_name>"
    }
    ```

#### Response

- **Success (200)**:
    ```json
    {
      "id": <patient_id>,
      "nom": "<patient_last_name>",
      "prenom": "<patient_first_name>",
      "username": "<username>",
      "token": "<authentication_token>"
    }
    ```
- **Error (400)**:
    ```json
    {
      "error": "Error in patient creation"
    }
    ```

### 6. Create Doctor

- **Endpoint**: `POST /users/creer_medcin/`
- **Description**: Allows a superuser to create a new doctor.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires Superuser role)
    ```
- **Body**:
    ```json
    {
      "nom": "<doctor_last_name>",
      "prenom": "<doctor_first_name>"
    }
    ```

#### Response

- **Success (200)**:
    ```json
    {
      "id": <doctor_id>,
      "nom": "<doctor_last_name>",
      "prenom": "<doctor_first_name>",
      "username": "<username>",
      "token": "<authentication_token>"
    }
    ```
- **Error (400)**:
    ```json
    {
      "error": "Error in doctor creation"
    }
    ```

### 7. Create Lab Technician (Laborantin)

- **Endpoint**: `POST /users/creer_laborantin/`
- **Description**: Allows a superuser to create a lab technician, generating a user, token, and assigning the lab technician to the user.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires Superuser role)
    ```
- **Body**:
    ```json
    {
      "nom": "<lab_technician_last_name>",
      "prenom": "<lab_technician_first_name>"
    }
    ```

#### Response

- **Success (200)**:
    ```json
    {
      "laborantin": {
        "id": <lab_technician_id>,
        "nom": "<lab_technician_last_name>",
        "prenom": "<lab_technician_first_name>",
        "user": {
          "username": "<username>",
          "token": "<token>"
        }
      }
    }
    ```
- **Error (400)**:
    ```json
    {
      "detail": "errors in data"
    }
    ```

### 8. Create Radiologist

- **Endpoint**: `POST /users/creer_radiologue/`
- **Description**: Allows a superuser to create a radiologist, generating a user, token, and assigning the radiologist to the user.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires Superuser role)
    ```
- **Body**:
    ```json
    {
      "nom": "<radiologist_last_name>",
      "prenom": "<radiologist_first_name>"
    }
    ```

#### Response

- **Success (200)**:
    ```json
    {
      "radiologue": {
        "id": <radiologist_id>,
        "nom": "<radiologist_last_name>",
        "prenom": "<radiologist_first_name>",
        "user": {
          "username": "<username>",
          "token": "<token>"
        }
      }
    }
    ```
- **Error (400)**:
    ```json
    {
      "detail": "errors in data"
    }
    ```

### 9. Create Nurse (Infirmier)

- **Endpoint**: `POST /users/creer_infirmier/`
- **Description**: Allows a superuser to create a nurse, generating a user, token, and assigning the nurse to the user.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires Superuser role)
    ```
- **Body**:
    ```json
    {
      "nom": "<nurse_last_name>",
      "prenom": "<nurse_first_name>"
    }
    ```

#### Response

- **Success (200)**:
    ```json
    {
      "infirmier": {
        "id": <nurse_id>,
        "nom": "<nurse_last_name>",
        "prenom": "<nurse_first_name>",
        "groupe": "<nurse_group>",  *(This "groupe" field is new and wasn't in the original document)*
        "user": {
          "username": "<username>",
          "token": "<token>"
        }
      }
    }
    ```
- **Error (400)**:
    ```json
    {
      "detail": "errors in data"
    }
    ```

### 10. Create Administrative User (Administratif)

- **Endpoint**: `POST /users/creer_administratif/`
- **Description**: Allows a superuser to create an administrative user, generating a user, token, and assigning the administrative role to the user.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires Superuser role)
    ```
- **Body**:
    ```json
    {
      "nom": "<administrative_user_last_name>",
      "prenom": "<administrative_user_first_name>"
    }
    ```

#### Response

- **Success (200)**:
    ```json
    {
      "administratif": {
        "id": <administrative_user_id>,
        "nom": "<administrative_user_last_name>",
        "prenom": "<administrative_user_first_name>",
        "user": {
          "username": "<username>",
          "token": "<token>"
        }
      }
    }
    ```
- **Error (400)**:
    ```json
    {
      "detail": "errors in data"
    }
    ```




### 11. Consult Patient Profile

- **Endpoint**: `GET /users/consulter_profil_patient/`
- **Description**: Retrieves information about a specific patient.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires authenticated role)
    ```

#### Response

- **Success (200)**:
    ```json
    {
      "id": <patient_id>,
      "nom": "<patient_last_name>",
      "prenom": "<patient_first_name>",
      "username": "<username>"
    }
    ```
- **Error (404)**:
    ```json
    {
      "error": "Patient not found"
    }
    ```

### 12. Consult Doctor Profile

- **Endpoint**: `GET /users/consulter_profil_medcin/`
- **Description**: Retrieves information about a specific doctor.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires authenticated role)
    ```

#### Response

- **Success (200)**:
    ```json
    {
      "id": <doctor_id>,
      "nom": "<doctor_last_name>",
      "prenom": "<doctor_first_name>",
      "username": "<username>"
    }
    ```
- **Error (404)**:
    ```json
    {
      "error": "Doctor not found"
    }
    ```

### 13. Consult Lab Technician Profile

- **Endpoint**: `GET /users/consulter_profil_laborantin/`
- **Description**: Retrieves information about a specific lab technician.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires authenticated role)
    ```
- **Body**:
    ```json
    {
      "laborantin": "<lab_technician_id>"
    }
    ```

#### Response

- **Success (200)**:
    ```json
    {
      "id": <lab_technician_id>,
      "nom": "<lab_technician_last_name>",
      "prenom": "<lab_technician_first_name>",
      "autres_champs": "<values>"  *(This "autres_champs" field is new)*
    }
    ```
- **Error (404)**:
    ```json
    {
      "detail": "Lab Technician not found"
    }
    ```

### 14. Consult Radiologist Profile

- **Endpoint**: `GET /users/consulter_profil_radiologue/`
- **Description**: Retrieves information about a specific radiologist.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires authenticated role)
    ```
- **Body**:
    ```json
    {
      "radiologue": "<radiologist_id>"
    }
    ```

#### Response

- **Success (200)**:
    ```json
    {
      "id": <radiologist_id>,
      "nom": "<radiologist_last_name>",
      "prenom": "<radiologist_first_name>",
      "autres_champs": "<values>" *(This "autres_champs" field is new)*
    }
    ```
- **Error (404)**:
    ```json
    {
      "detail": "Radiologist not found"
    }
    ```

### 15. Consult Nurse Profile

- **Endpoint**: `GET /users/consulter_profil_infirmier/`
- **Description**: Retrieves information about a specific nurse.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires authenticated role)
    ```
- **Body**:
    ```json
    {
      "infirmier": "<nurse_id>"
    }
    ```

#### Response

- **Success (200)**:
    ```json
    {
      "id": <nurse_id>,
      "nom": "<nurse_last_name>",
      "prenom": "<nurse_first_name>",
      "autres_champs": "<values>" *(This "autres_champs" field is new)*
    }
    ```
- **Error (404)**:
    ```json
    {
      "detail": "Nurse not found"
    }
    ```

### 16. Consult Administrative User Profile

- **Endpoint**: `GET /users/consulter_profil_administratif/`
- **Description**: Retrieves information about a specific administrative user.

#### Request

- **Headers**:
    ```
    Content-Type: application/json
    Authorization: Token <token> (requires authenticated role)
    ```
- **Body**:
    ```json
    {
      "administratif": "<administrative_user_id>"
    }
    ```

#### Response

- **Success (200)**:
    ```json
    {
      "id": <administrative_user_id>,
      "nom": "<administrative_user_last_name>",
      "prenom": "<administrative_user_first_name>",
      "autres_champs": "<values>" *(This "autres_champs" field is new)*
    }
    ```
- **Error (404)**:
    ```json
    {
      "detail": "Administrative User not found"
    }
    ```