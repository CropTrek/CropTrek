import requests
from bs4 import BeautifulSoup
import json
# Making a GET request
r = requests.get('https://www.planetnatural.com/pest-problem-solver/plant-disease/potato-scab/')
 
def extract_data(url):
    # Faire une requête GET
    r = requests.get(url)

    # Parsing the HTML
    soup = BeautifulSoup(r.content, 'html.parser')
    div_principal = soup.find('div', {'class': 'post-entry'})
    ol_div = div_principal.find_all('ol')
    treatment = ol_div[0]
    li_elements = treatment.find_all("li")

    # Créer une liste pour stocker les éléments li avec leurs numéros
    li_list = []

    # Ajouter un numéro à chaque li et les stocker dans la liste
    for i, li in enumerate(li_elements):
        li_numbered = f"{i+1}. {li.string}"
        li_list.append(li.get_text().strip())

    # Créer un dictionnaire avec les données
    data = {
       
        'treatment': li_list,
    }

    return data

# Liste des URL des pages Web à extraire
urls = [
    'https://www.planetnatural.com/pest-problem-solver/plant-disease/early-blight/',
    'https://www.planetnatural.com/pest-problem-solver/plant-disease/late-blight/',
    'https://www.planetnatural.com/pest-problem-solver/plant-disease/mosaic-virus/',
    'https://www.planetnatural.com/pest-problem-solver/plant-disease/bacterial-leaf-spot/'
    
]

# Liste pour stocker les données extraites
data_list = []

# Extraire les données de chaque page Web et les stocker dans la liste
for url in urls:
    data = extract_data(url)
    data_list.append(data)

# Enregistrer les données dans un fichier JSON
with open('C:/Users/MSI/Pictures/Diseases/dataDisease.json', 'w') as f:
    json.dump(data_list, f)

