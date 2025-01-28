from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import requests

API_URL = "http://127.0.0.1:8000/dpi/creer/"

test_data = {
    "patient": {
        "nss": "0011223344",
        "nom": "Doe",
        "prenom": "John",
        "date_naissance": "1985-05-12",
        "adresse": "123 Example Street",
        "mutuelle": "MutuelleX",
        "personne_a_contacter": {
            "nom": "Smith",
            "prenom": "Jane"
        }
    },
    "medecin_traitant": "House Gregory"
}

driver = webdriver.Chrome()
driver.maximize_window()

try:
    driver.get("http://your-api-doc-url.com")

    time.sleep(2)

    headers = {
        "Content-Type": "application/json",
    }

    response = requests.post(API_URL, json=test_data, headers=headers)

    if response.status_code == 201:
        print("Test Passed: DPI created successfully.")
        print("Response:", response.json())
    elif response.status_code == 400:
        print("Test Failed: Incomplete data error.")
        print("Error:", response.json().get("error"))
    elif response.status_code == 404:
        print("Test Failed: Medecin not found.")
        print("Error:", response.json().get("error"))
    else:
        print("Test Failed: Unexpected status code:", response.status_code)
        print("Response:", response.text)

    time.sleep(2)
    driver.quit()

except Exception as e:
    print("Test Failed:", str(e))
    driver.quit()
