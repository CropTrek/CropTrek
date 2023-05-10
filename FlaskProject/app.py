from bson import ObjectId
from flask import Flask, jsonify, request
import geopy
from pymongo import MongoClient
from bson import json_util
from geopy import distance
from flask_cors import CORS
import numpy as np
import pandas as pd
import pickle
import sys
import torch
import torch.nn as nn
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
import io
import sys
import cv2
import tensorflow as tf
import numpy as np
from PIL import Image
import pytesseract
from io import BytesIO
import os
#For Clustering Analysis
from sklearn.cluster import KMeans
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
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
        if dist <= 10: 
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
        if user['role'] == 'supplier': 
            product_location = (user['adresse']['coordinates'][0], user['adresse']['coordinates'][1])
            dist = distance.distance(user_location, product_location).km
            if dist <= 10: 
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
        if user['role'] == 'supplier': 
            product_location = (user['adresse']['coordinates'][0], user['adresse']['coordinates'][1])
            dist = distance.distance(user_location, product_location).km
            if dist >= 10: 
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


############################################################# Partie Eya #####################################

# Loading trained model
model = pickle.load(open('model.pkl', 'rb'))

def predict_crop(N, P, K, pH, Tmin, Tmax):
    # Load dataset
    data = pd.read_csv('cropRegression.csv', usecols=['N', 'P', 'K', 'pH','Crop','Tmin','Tmax'])

    # Removing the Labels column
    x = data.drop(['Crop'], axis=1)

    # Selecting all values of data
    x = x.values

    # Determining Optimum number of Clusters within Dataset by using K-means Clustering
    km = KMeans(n_clusters = 4, init = 'k-means++', max_iter = 300, n_init = 10, random_state = 0)
    y_means = km.fit_predict(x)

    # Splitting dataset for Predictive Modelling
    y = data['Crop']
    x = data.drop(['Crop'],axis = 1)

    # Training and Testing Sets for Validation of Results
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=0)

    # Training logistic regression model
    model2 = LogisticRegression(solver='liblinear')
    model2.fit(x_train, y_train)

    # Creating input data array
    input_data = np.array([N, P, K, pH, Tmin, Tmax]).reshape(1,-1)

    # Making prediction with the loaded model
    prediction = model2.predict(input_data)[0]

    return prediction

# Route to handle prediction request
@app.route('/predict', methods=['POST'])
def prediction():
    # Get data from request
    data = request.get_json(force=True)

    # Make prediction
    prediction = predict_crop(data['N'], data['P'], data['K'], data['pH'], data['Tmin'], data['Tmax'])

    # Return prediction as response
    return str(prediction)

class Plant_Disease_Model(nn.Module):

    def __init__(self):
        super().__init__()
        self.network = models.resnet34(pretrained=True)
        num_ftrs = self.network.fc.in_features
        self.network.fc = nn.Linear(num_ftrs, 38)

    def forward(self, xb):
        out = self.network(xb)
        return out

transform = transforms.Compose(
    [transforms.Resize(size=128),
     transforms.ToTensor()])

num_classes = ['Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy', 'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy', 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_', 'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 'Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy', 'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy',
               'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch', 'Strawberry___healthy', 'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy']


model = Plant_Disease_Model()
model.load_state_dict(torch.load(
    'plantDisease-resnet34.pth', map_location=torch.device('cpu')))
model.eval()

@app.route('/predictDisease', methods=['POST'])
def predictDisease():
    file_path = request.form.get('imagePath')  # Récupère le chemin du fichier depuis la requête

    with open(file_path, 'rb') as file:
        img_pil = Image.open(io.BytesIO(file.read()))

        tensor = transform(img_pil)
        xb = tensor.unsqueeze(0)
        yb = model(xb)
        probs = torch.softmax(yb, dim=1)
        max_prob, preds = torch.max(probs, dim=1)
        gray = cv2.cvtColor(np.array(img_pil), cv2.COLOR_RGB2GRAY)

        # Threshold the image to get a binary image
        ret, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)

        # Find contours in the binary image
        contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

        # Définition du seuil
        threshold = 0.99

        if len(contours) > 0:
            for contour in contours:
                area = cv2.contourArea(contour)

                # If the area is too small, ignore the contour
                if area < 100:
                    continue

                # Compute the perimeter of the contour
                perimeter = cv2.arcLength(contour, True)

                # Compute the compactness of the contour
                compactness = area / ((perimeter ** 2) / (4 * np.pi)) - 1

                # If the compactness is low, the contour is likely a leaf
                if compactness < 0.1:
                    # Check the color of the leaf
                    hsv = cv2.cvtColor(np.array(img_pil), cv2.COLOR_RGB2HSV)
                    lower_green = np.array([40, 40, 40])
                    upper_green = np.array([70, 255, 255])
                    mask = cv2.inRange(hsv, lower_green, upper_green)
                    result = cv2.bitwise_and(np.array(img_pil), np.array(img_pil), mask=mask)
                    total_pixels = mask.shape[0] * mask.shape[1]
                    green_pixels = np.sum(mask == 255)
                    green_percentage = green_pixels / total_pixels

                    # Check if green is the dominant color in the image
                    if np.sum(mask) > 0 and green_percentage > 0.05:
                        if max_prob.item() > threshold:
                            pred_class = num_classes[preds[0].item()]
                            return (pred_class)
                        else:
                            return ("We could not analyze this image! Please verify")
        return ("We could not analyze this image! Please verify")

@app.route('/detect_text', methods=['POST'])
def detect_text():
    # Get the uploaded image file
    image_file = request.form.get('image')



    # Load the image
    image = cv2.imread(image_file)

    # Convert the image to grayscale for text detection
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Define the words to search for
    mot1 = "propriete"
    mot2 = request.form.get('word')

    # Configuration for text detection with pytesseract
    config = "--psm 6"
    pytesseract.pytesseract.tesseract_cmd = r'C:/Program Files/Tesseract-OCR/tesseract.exe'

    # Detect text in the image
    detected_text = pytesseract.image_to_string(gray_image, config=config)

    if (mot1.upper() in detected_text or mot1 in detected_text) and mot2 in detected_text:
        result = 'yes'
    else:
        result = 'no'



    return result






















if __name__ == '__main__':
    app.run(debug=True, port=1000)

# python app.py
