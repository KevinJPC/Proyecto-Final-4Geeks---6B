"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User_client, User_restaurant
from api.utils import generate_sitemap, APIException
import datetime
import cloudinary
import cloudinary.uploader


from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }
    return jsonify(response_body), 200


@api.route('/register/client', methods=["POST"])
def register_client():
    if request.method == 'POST':
        name = request.json.get("name", None)
        email = request.json.get("email", None)
        password = request.json.get("password", None)

        if not name:
            return jsonify({"message": "User required"}), 400

        if not email:
            return jsonify({"message": "Email required"}), 400

        if not password:
            return jsonify({"message": "Password required"}), 400

        user_client = User_client.query.filter_by(email=email).first()
        print(user_client)
        if user_client:
            return jsonify({"message": "User already exist"}), 400

        user_client = User_client()
        user_client.name = name
        user_client.email = email
        hashed_password = generate_password_hash(password)

        user_client.password = hashed_password
        user_client.is_active = True

        db.session.add(user_client)
        db.session.commit()

        return jsonify({"ok": "Register succesful!", "status": "true"}), 200

@api.route('/register/restaurant', methods=["POST"])
def register_restaurant():
    if request.method == 'POST':
        name = request.json.get("name", None)
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        # image = request.json.get("image", None)
        address = request.json.get("address", None)
        phone = request.json.get("phone", None)
        category = request.json.get("category", None)
        welcome_message = request.json.get("welcome_message", None)
        description = request.json.get("description", None)
        

        if not name:
            return jsonify({"message": "Name required"}), 400

        if not email:
            return jsonify({"message": "Email required"}), 400

        if not password:
            return jsonify({"message": "Password required"}), 400

        # if not image:
        #     return jsonify({"message": "Image required"}), 400

        if not address:
            return jsonify({"message": "Address required"}), 400

        if not phone:
            return jsonify({"message": "Phone required"}), 400

        if not category:
            return jsonify({"message": "Category required"}), 400

        if not welcome_message:
            return jsonify({"message": "welcome_message required"}), 400

        if not description:
            return jsonify({"message": "description required"}), 400

        user_restaurant = User_restaurant.query.filter_by(email=email).first()
        print(user_restaurant)
        if user_restaurant:
            return jsonify({"message": "The user already exist"}), 400

        user_restaurant = User_restaurant()
        user_restaurant.email = email
        user_restaurant.name = name
        # user_restaurant.image = image
        user_restaurant.address = address
        user_restaurant.phone = phone
        user_restaurant.category = category
        user_restaurant.welcome_message = welcome_message
        user_restaurant.description = description
        user_restaurant.is_active = True

        hashed_password = generate_password_hash(password)

        user_restaurant.password = hashed_password

        db.session.add(user_restaurant)
        db.session.commit()

        query = User_restaurant.query.filter_by(email=email).first()
        user_restaurant = query.serialize3();

        return jsonify({"ok": "Register succesful!", "results": user_restaurant, "status": "true"}), 200

    return jsonify(response_body), 200

@api.route('/restaurants/<int:user_id>/image', methods=['POST'])
def handle_upload(user_id):

    # validate that the front-end request was built correctly
    print(request.files['image'], "image")
    if 'image' in request.files:
        # upload file to uploadcare
        result = cloudinary.uploader.upload(request.files['image'], folder='img-restaurants/')
        # fetch for the user
        user_restaurant = User_restaurant.query.get(user_id)
        # update the user with the given cloudinary image URL
        user_restaurant.image_url = result['secure_url']

        db.session.add(user_restaurant)
        db.session.commit()

    return jsonify("ok"), 200

@api.route('/restaurants', methods=['GET'])
def get_restaurants():

    query = User_restaurant.query.all();
    users_restaurant = list(map(lambda restaurant: restaurant.serialize2(), query)) 

    response_body = {
        "results": users_restaurant,
        "status": True
    }
    return jsonify(response_body), 200

@api.route('/restaurant/<int:id>', methods=['GET'])
def get_restaurant(id):

    query = User_restaurant.query.get(id);
    user_restaurant = query.serialize();

    response_body = {
        "results": user_restaurant,
        "status": True
    }
    
    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def login_client_user():
    if request.method == 'POST':
        email = request.json.get("email", None)
        password = request.json.get("password", None)

        if not email:
            return jsonify({"message": "Email required"}), 400

        if not password:
            return jsonify({"message": "Password required"}), 400

        user = None
        user_serialize = None

        user_client = User_client.query.filter_by(email=email).first()
        
        if user_client:
            user=user_client
            user_serialize = user_client.serialize()

        user_restaurant = User_restaurant.query.filter_by(email=email).first()

        if  user_restaurant:
            user=user_restaurant
            user_serialize = user_restaurant.serialize()
        

        if not user_client and not user_restaurant:
            return jsonify({"message": "The email/password is incorrect", "status": False}), 401

        if not check_password_hash(user.password, password):
            return jsonify({"message": "The password is incorrect", "status": False}), 401

        expiracion = datetime.timedelta(days=1)
        access_token = create_access_token(identity=user.id, expires_delta=expiracion)

        print("test")
        data = {
            "user": user_serialize,
            "token": access_token,
            "expires": expiracion.total_seconds()*1000, 
            "status": True
        }

        return jsonify(data), 200