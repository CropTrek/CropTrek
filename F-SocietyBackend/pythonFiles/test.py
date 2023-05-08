import pymongo
import os
import sys
import json

# Récupérer l'URL de la base de données à partir de la variable d'environnement
mongo_url = os.environ.get('MONGODB_URL')

# Se connecter à la base de données
client = pymongo.MongoClient(mongo_url)
db = client.get_default_database()

# Définir les collections
product_collection = db['products']
order_collection = db['orders']

def get_product_recommendations(product_id):
    try:
        # Trouver les commandes qui contiennent le produit spécifié
        orders = order_collection.find({'orderItems.product': product_id})

        # Compter le nombre de chaque produit commandé (sauf celui spécifié)
        products = {}
        for order in orders:
            for item in order['orderItems']:
                if item['product'] != product_id:
                    if item['product'] in products:
                        products[item['product']] += item['qty']
                    else:
                        products[item['product']] = item['qty']

        # Obtenir les 5 produits les plus recommandés
        sorted_products = sorted(products.items(), key=lambda x: x[1], reverse=True)[:5]

        # Récupérer les détails de chaque produit recommandé
        recommended_products = []
        for product in sorted_products:
            recommended_product = product_collection.find_one({'_id': product[0]})
            recommended_products.append(recommended_product)

        # Créer un message de succès
        message = 'Produits rs'
        response = {'message': message, 'recommended_products': recommended_products}

        # Ajouter le message à la réponse JSON contenant les produits recommandés
        return json.dumps(response)
    except Exception as e:
        print(e)
        return json.dumps({'error': 'Une erreur s\'est produite lors de la récupération des recommandations de produit'})

if __name__ == '__main__':
    product_id = sys.argv[1]
    recommended_products = get_product_recommendations(product_id)
    try:
        parsed_json = json.loads(recommended_products)
        print(parsed_json)
    except json.JSONDecodeError as e:
        print("Erreur lors du chargement de la chaîne JSON:", e.msg)
