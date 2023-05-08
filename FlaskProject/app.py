from bson import ObjectId
from flask import Flask, jsonify, request
import geopy
from pymongo import MongoClient
from bson import json_util
from geopy import distance
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
client = MongoClient("mongodb+srv://Fsociety:Fsociety@f-society.pi7wruv.mongodb.net/FsocietyDB?retryWrites=true&w=majority")
db = client.FsocietyDB

@app.route('/recProducts/<product_id>')
def home(product_id):
    product = db.products.find_one({'_id': ObjectId(product_id)})
    product_orders = db.orders.find({'orderItems.product': ObjectId(product_id)})
    product_count = {}
    for order in product_orders:
        for item in order['orderItems']:
            if item['product'] == ObjectId(product_id):
                continue
            if str(item['product']) not in product_count:
                product_count[str(item['product'])] = 0
            product_count[str(item['product'])] += item['qty']
    top_products = sorted(product_count.items(), key=lambda x: x[1], reverse=True)[:5]
    recommended_products = []
    for product_id, count in top_products:
        product = db.products.find_one({'_id': ObjectId(product_id)})
        recommended_products.append(product)
    return json_util.dumps({
        'product': product,
        'recommended_products': recommended_products
    })


@app.route('/nearProducts/<userId>')
def get_nearby_products(userId):
    user = db.users.find_one({"_id": ObjectId(userId)})
    if not user:
        return json_util.dumps({'error': 'User not found'})

    user_location = (user['adresse']['coordinates'][0], user['adresse']['coordinates'][1])
    nearby_products = []

    products = db.products.find()
    for product in products:
        product_user = db.users.find_one({"_id": ObjectId(product['user'])})
        if not product_user:
            return json_util.dumps({'error': 'Product user not found'})

        product_location = (product_user['adresse']['coordinates'][0], product_user['adresse']['coordinates'][1])
        dist = distance.distance(user_location, product_location).km
        if dist <= 10:  # Vous pouvez changer le rayon ici
            product['user'] = product_user
            nearby_products.append(product)

    return json_util.dumps({'nearby_products': nearby_products})



@app.route('/users/nearbyUsers/<userId>')
def get_nearby_users(userId):
    user = db.users.find_one({"_id": ObjectId(userId)})
    if not user:
        return json_util.dumps({'error': 'User not found'})

    user_location = (user['adresse']['coordinates'][0], user['adresse']['coordinates'][1])
    nearby_users = []

    users = db.users.find()
    for user in users:
        if user['role'] == 'supplier':  # Vérifier le rôle de l'utilisateur
            product_location = (user['adresse']['coordinates'][0], user['adresse']['coordinates'][1])
            dist = distance.distance(user_location, product_location).km
            if dist <= 10:  # Vous pouvez changer le rayon ici
                nearby_users.append(user)

    return json_util.dumps({'nearby_users': nearby_users})


@app.route('/users/otherUsers/<userId>')
def get_other_users(userId):
    user = db.users.find_one({"_id": ObjectId(userId)})
    if not user:
        return json_util.dumps({'error': 'User not found'})

    user_location = (user['adresse']['coordinates'][0], user['adresse']['coordinates'][1])
    nearby_users = []

    users = db.users.find()
    for user in users:
        if user['role'] == 'supplier':  # Vérifier le rôle de l'utilisateur
            product_location = (user['adresse']['coordinates'][0], user['adresse']['coordinates'][1])
            dist = distance.distance(user_location, product_location).km
            if dist >= 10:  # Vous pouvez changer le rayon ici
                nearby_users.append(user)

    return json_util.dumps({'nearby_users': nearby_users})


@app.route('/rec/<productId>/recommendations')
def recommend_products(productId):
    try:
        orders = db.orders.find({ 'orderItems.product': productId })
        print("Orders:", list(orders))
        products = {}

        for order in orders:
            for item in order['orderItems']:
                if item['product'] != productId:
                    if item['product'] in products:
                        products[item['product']] += item['qty']
                    else:
                        products[item['product']] = item['qty']

        sorted_products = sorted(products.items(), key=lambda x: x[1], reverse=True)[:5]

        recommended_products = []

        for product in sorted_products:
            recommended_product = db.products.find_one({ '_id': product[0] })
            recommended_products.append(recommended_product)

        return jsonify({'recommended_products': recommended_products})
    except Exception as e:
        print(e)
        return jsonify({'message': 'Une erreur est survenue'}), 500
    
    
@app.route('/products/<productId>')
def get_product(productId):
    try:
        product = db.products.find_one({ '_id': ObjectId(productId) })
        if product:
            return json_util.dumps(product)
        else:
            return jsonify({'message': 'Le produit n\'existe pas'}), 404
    except Exception as e:
        print(e)
        return jsonify({'message': 'Une erreur est survenue'}), 500
if __name__ == '__main__':
    app.run(debug=True, port=1000)

# python app.py
