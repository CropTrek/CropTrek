# import requests
# import json
# from bs4 import BeautifulSoup




# def extract_data(url):
#     # Extraire les données de la page
#     response = requests.get(url)
#     soup = BeautifulSoup(response.content, "html.parser")

#     care_guide_items = soup.find_all("div", class_="care-guide-item")
#     care_guide_download=soup.find_all("div",class_="care-guide-download-item-content")

#     data = {}
#     title_mapping = {
#         "water": "water",
#         "fertilization": "fertilization",
#         "soil": "soil",
#         "hardiness zones": "hardinessZones",
#         "planting time": "plantingTime",
#         "sunlight": "sunlight",
        
#     }
#     titles = ["water", "fertilization", "soil",  "hardiness zones", "planting time", "sunlight"]
#     for item in care_guide_items:
#         title = item.find("div", class_="care-guide-item-title-text").text
#         content = ' '.join(item.find("div", class_="care-guide-item-content").text.strip().split()[1:])
#         if title.lower() in titles:
#             data[title_mapping[title.lower()]] = content
#             titles.remove(title.lower())

#     for item2 in care_guide_download:
#         titleDownload = item2.find("div", class_="care-guide-download-item-text-1").text
#         contentDownload = item2.find("div", class_="care-guide-download-item-text-2").text
#         if titleDownload.lower() in titles:
#             data[title_mapping[titleDownload.lower()]] = contentDownload
#             titles.remove(titleDownload.lower())
#         if not titles:
#             break
            
            
# #     images_list = []
# #     images = soup.select('img')
# #     for image in images:
# #         src = image.get('src')
# #         images_list.append({"src": src})
# #     #data['img']=images_list[2]['src']
# #     img_element = soup.find('div', class_='care-guide-download-content-cover-wrap').find('img')
# #     if img_element != None:
# # # Récupérez la valeur de l'attribut 'data-src'
# #         src = img_element.get('src').replace('&amp;', '&')
# #         img_element['src'] = src
# #         print(img_element.get('src'))
    
    
#     return data

  

# plant_urls = {"Potato" : 'https://www.picturethisai.com/wiki/Solanum_tuberosum.html',
#         "Tomato" : 'https://www.picturethisai.com/wiki/Solanum_lycopersicum.html',
#         "Cucumber":'https://www.picturethisai.com/wiki/Cucumis_sativus.html',
#         "Coriander":'https://www.picturethisai.com/wiki/Coriandrum_sativum.html',
#         "Pumpkin":"https://www.picturethisai.com/wiki/Cucurbita_pepo.html",
#         "Maize":"https://www.picturethisai.com/wiki/Zea_mays.html",
#        "Onion" :"https://www.picturethisai.com/wiki/Capsicum_annuum.html"
#       }






# data = {}
# for plant, url in plant_urls.items():
#     data[plant] = extract_data(url)

# # Enregistrer les données dans un fichier JSON
# with open("C:/Users/MSI/Pictures/Diseases/TreeData.json", "w") as f:
#     json.dump(data, f)

import requests
from bs4 import BeautifulSoup
import json
# URL de la page principale
url = 'https://www.picturethisai.com/wiki'

# Obtenir le contenu de la page
response = requests.get(url)
html_content = response.content

# Parser le contenu HTML avec Beautiful Soup
soup = BeautifulSoup(html_content, 'html.parser')

def extract_data(url):
    # Extraire les données de la page
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    care_guide_items = soup.find_all("div", class_="care-guide-item")
    care_guide_download=soup.find_all("div",class_="care-guide-download-item-content")

    data = {}
    title_mapping = {
        "water": "water",
        "fertilization": "fertilization",
        "soil": "soil",
        "hardiness zones": "hardinessZones",
        "planting time": "plantingTime",
        "sunlight": "sunlight",
        
    }
    titles = ["water", "fertilization", "soil",  "hardiness zones", "planting time", "sunlight"]
    for item in care_guide_items:
        title = item.find("div", class_="care-guide-item-title-text").text
        content = ' '.join(item.find("div", class_="care-guide-item-content").text.strip().split()[1:])
        if title.lower() in titles:
            data[title_mapping[title.lower()]] = content
            titles.remove(title.lower())

    for item2 in care_guide_download:
        titleDownload = item2.find("div", class_="care-guide-download-item-text-1").text
        contentDownload = item2.find("div", class_="care-guide-download-item-text-2").text
        if titleDownload.lower() in titles:
            data[title_mapping[titleDownload.lower()]] = contentDownload
            titles.remove(titleDownload.lower())
        if not titles:
            break
    return data



# Trouver les divs avec les labels "Fruits" et "Vegetables"
divs = soup.find_all('div', string=['Fruits', 'Vegetables'])    
   

# Initialiser un dictionnaire pour stocker les liens
plant_urls = {}

# Pour chaque div avec un label "Fruits" ou "Vegetables"
for div in divs:
    # Trouver le div suivant qui contient les espèces
    species_div = div.find_next_sibling('div', {'class': 'species'})
    if species_div:
        # Pour chaque espèce dans le div des espèces
        for specie in species_div.find_all('div', {'class': 'specie'}):
            # Extraire le nom latin de l'espèce
            latin_name = specie.find('div', {'class': 'latin-name'}).text.strip()
            common_name = specie.find('h3', {'class': 'common-name'}).text.strip()
            print(common_name)
            # Construire l'URL correspondante
            url_name = latin_name.replace(' ', '_') + '.html'
            species_url = 'https://www.picturethisai.com/wiki/' + url_name
            # Ajouter le lien au dictionnaire avec le nom de l'espèce comme clé
            plant_urls[common_name] = species_url

# Initialiser un dictionnaire pour stocker les données
data = {}

# Pour chaque plante dans le dictionnaire de liens
for plant, url in plant_urls.items():
    # Extraire les données correspondantes
    data[plant] = extract_data(url)
#with open("C:/Users/MSI/Pictures/Diseases/TreeData.json", "w") as f:
    #json.dump(data, f)