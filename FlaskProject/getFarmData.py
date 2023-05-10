import requests
from bs4 import BeautifulSoup
import json

def extract_data(url):
  r = requests.get(url)
 
      
  soup = BeautifulSoup(r.content, 'html.parser')
  div_principal = soup.find('div', {'class': 'rc-post-entry'})
  
  p_tags = div_principal.find_all('p')
  ol_tags = div_principal.find_all('ol')
  li_elements = ol_tags[0].find_all("li")
  images_list = []
  images = soup.select('img')
  for image in images:
    src = image.get('src')
   
    images_list.append({"src": src})
        
        # Creating a dictionary to store the extracted data
 # Trouver la première balise h contenant un texte spécifique
  howPlant_h = div_principal.select_one('h3:contains("How to Plant")')
  howPlant_tags = []
  for tag in howPlant_h.find_next_siblings():
    if tag.name.startswith('h'):
      break
    elif tag.name == 'p':
      howPlant_tags.append(tag)
  ####################################################""
  site_preparation_h = div_principal.select_one('h3:contains("Site Preparation")')
  site_preparation_tags = []
  for tag in site_preparation_h.find_next_siblings():
    if tag.name.startswith('h'):
      break
    elif tag.name == 'p':
      site_preparation_tags.append(tag)
  #####################################################""
  storage_h = div_principal.select_one('h3:contains("Harvest and Store"), h3:contains("Harvesting and Storage")')
  storage_tags = []
  for tag in storage_h.find_next_siblings():
    if tag.name.startswith('h'):
      break
    elif tag.name == 'p':
      storage_tags.append(tag)
  ##########################################################""
  diseases_h = div_principal.select_one('h1:contains("Disease Problems"), h2:contains("Disease Problems"), h3:contains("Disease Problems"), h4:contains("Disease Problems")')
  diseases_tags = []
  for tag in diseases_h.find_next_siblings():
    if tag.name.startswith('h'):
      break
    elif tag.name == 'p':
      diseases_tags.append(tag)   
   ################ formater data#####################
   
   
   
   
   
  diseases_data = {}
  site_preparation_data = {}
  howPlant_data = {}
  storage_data = {}
  diseases_count = 1
  site_preparation_count = 1
  howPlant_count = 1
  storage_count = 1
  for p in diseases_tags:
    # Extraire le texte brut du paragraphe
    p_text = p.get_text(strip=True)

    # Ajouter le paragraphe au dictionnaire formaté avec une clé au format 'p1', 'p2', etc.
    diseases_data[f'p{diseases_count}'] = p_text

    # Augmenter le compteur de paragraphe
    diseases_count += 1
  ############################################"
  for p in site_preparation_tags:
    # Extraire le texte brut du paragraphe
    p_text = p.get_text(strip=True)

    # Ajouter le paragraphe au dictionnaire formaté avec une clé au format 'p1', 'p2', etc.
    site_preparation_data[f'p{site_preparation_count}'] = p_text

    # Augmenter le compteur de paragraphe
    site_preparation_count += 1
    #############################################"
  for p in howPlant_tags:
    # Extraire le texte brut du paragraphe
    p_text = p.get_text(strip=True)

    # Ajouter le paragraphe au dictionnaire formaté avec une clé au format 'p1', 'p2', etc.
    howPlant_data[f'p{howPlant_count}'] = p_text

    # Augmenter le compteur de paragraphe
    howPlant_count += 1
    #####################################################"
  for p in storage_tags:
    # Extraire le texte brut du paragraphe
    p_text = p.get_text(strip=True)

    # Ajouter le paragraphe au dictionnaire formaté avec une clé au format 'p1', 'p2', etc.
    storage_data[f'p{storage_count}'] = p_text

    # Augmenter le compteur de paragraphe
    storage_count += 1
  

  data = {
  'p1': p_tags[0].get_text(),
  'p2': p_tags[1].get_text(),
  
  'site_preparation': site_preparation_data,
  
  'howPlant': howPlant_data,
  
  'quick_guide': [f"{i+1}. {li.string}" for i, li in enumerate(li_elements)],
  
  'storage': storage_data,
 
  'diseases': diseases_data,
 
  
  'img' : images_list[4]['src']}
  
  return data
urls = ['https://www.planetnatural.com/growing-potatoes/',
        'https://www.planetnatural.com/growing-tomato-plants/',
        'https://www.planetnatural.com/growing-onions/',
        'https://www.planetnatural.com/growing-corn/',
        'https://www.planetnatural.com/growing-peppers/',
        'https://www.planetnatural.com/growing-pumpkins/',
        'https://www.planetnatural.com/growing-artichoke/',
        'https://www.planetnatural.com/growing-carrots/',
        'https://www.planetnatural.com/growing-garlic/',
        ]
        # Adding the extracted data to a list
data_list=[]
for url in urls:
    data = extract_data(url)
    data_list.append(data)

    # Writing the extracted data to a JSON file
with open('C:/Users/MSI/Pictures/Diseases/dataFarm.json', 'w') as f:
  json.dump(data_list, f)