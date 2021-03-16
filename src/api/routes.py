"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from sqlalchemy.sql import func
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User_client, User_restaurant, Review, Favorite_restaurants
from api.utils import generate_sitemap, APIException
import datetime
import cloudinary
import cloudinary.uploader
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib

from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Global funtions #

def get_rating(id):
    query_reviews = Review.query.with_entities(func.avg(Review.rating).label('average')).filter(Review.user_restaurant_id == id).first()
    if query_reviews.average is None:
        return str(0.00)
    else: 
        return str(round(query_reviews.average, 2))

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

@api.route('/restaurants/<int:user>/image', methods=['POST'])
def handle_upload(user):

    # validate that the front-end request was built correctly
    print(request.files['image'], "image")
    if 'image' in request.files:
        # upload file to uploadcare
        result = cloudinary.uploader.upload(request.files['image'], folder='img-restaurants/')
        # fetch for the user
        user_restaurant = User_restaurant.query.get(user)
        # update the user with the given cloudinary image URL
        user_restaurant.image_url = result['secure_url']

        db.session.add(user_restaurant)
        db.session.commit()

    return jsonify("ok"), 200

@api.route('/restaurants', methods=['GET'])
def get_restaurants():

    query = User_restaurant.query.all();
    # users_restaurant = list(map(lambda restaurant: restaurant.serialize2(), query)) 
    users_restaurant = []
    for element in query:
        user_restaurant = element.serialize2()
        user_restaurant["rating"] = get_rating(user_restaurant["id"])
        users_restaurant.append(user_restaurant)

    response_body = {
        "results": users_restaurant,
        "status": True
    }
    return jsonify(response_body), 200

@api.route('/restaurant/<int:id>', methods=['GET'])
def get_restaurant(id):

    query = User_restaurant.query.get(id);
    user_restaurant = query.serialize();
    user_restaurant["rating"] = get_rating(id)

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

@api.route('/restaurant/review', methods=['POST'])
@jwt_required()
def add_review():
    user_client_id = get_jwt_identity()

    request_body = request.get_json();

    review = Review(user_client_id, request_body["user_restaurant_id"], request_body["comment"], request_body["rating"])
    db.session.add(review)
    db.session.commit()

    return jsonify({"message": "Review succesful!", "status": True}), 200

@api.route('/restaurant/<int:id>/review', methods=['GET'])
# @jwt_required()
def get_review(id):
    # user_client_id = get_jwt_identity()

    query_reviews = db.session.query(Review).join(User_client).filter(Review.user_restaurant_id==id).all()
    print(query_reviews)
    reviews = list(map(lambda review: review.serialize(), query_reviews)) 

    return jsonify({"message": "Get reviews succesful!", "results": reviews, "status": True}), 200

@api.route('/client/favorite/<int:user_restaurant_id>', methods=['POST'])
@jwt_required()
def add_favorite_restaurant(user_restaurant_id):
    user_client_id = get_jwt_identity()

    query_favorite = Favorite_restaurants.query.get((user_client_id, user_restaurant_id))
    if query_favorite:
        return jsonify({"message": "Favorite already exists!", "status": False}), 409


    favorite_restaurant = Favorite_restaurants(user_client_id, user_restaurant_id)

    db.session.add(favorite_restaurant)
    db.session.commit()

    return jsonify({"message": "Favorite added succesful!", "status": True}), 200

@api.route('/client/favorite', methods=['GET'])
@jwt_required()
def get_favorites_restaurants():
    user_client_id = get_jwt_identity()
    query_favorites = db.session.query(Favorite_restaurants).join(User_restaurant).filter(Favorite_restaurants.user_client_id==user_client_id).all()
    # print(query_favorites)
    # favorites = list(map(lambda favorite: favorite.serialize(), query_favorites))
    favorites = []
    for element in query_favorites:
        user_restaurant = element.serialize()
        user_restaurant["rating"] = get_rating(user_restaurant["user_restaurant_id"])
        favorites.append(user_restaurant)

    return jsonify({"message": "Get favorites succesful!", "results": favorites, "status": True}), 200

@api.route('/client/favorite/<int:user_restaurant_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite_restaurant(user_restaurant_id):
    user_client_id = get_jwt_identity()
    query_favorite = Favorite_restaurants.query.get((user_client_id, user_restaurant_id))
    if not query_favorite is None:
        db.session.delete(query_favorite)
        db.session.commit()
    return jsonify({"message": "Favorite deleted succesful!", "status": True}), 200



@api.route('/restaurant/search/name', methods=['GET'])
def get_restaurants_by_name():

    name = request.get_json()["name"]
    search = "%{}%".format(name)
    query = User_restaurant.query.filter(User_restaurant.name.like(search)).all()
    users_restaurant = []
    for element in query:
        user_restaurant = element.serialize2()
        user_restaurant["rating"] = get_rating(user_restaurant["id"])
        users_restaurant.append(user_restaurant)

    return jsonify({"message": "Get favorites succesful!", "results": users_restaurant, "status": True}), 200

@api.route('/restaurant/search/address', methods=['GET'])
def get_restaurants_by_address():

    address = request.get_json()["address"]
    search = "%{}%".format(address)
    query = User_restaurant.query.filter(User_restaurant.address.ilike(search)).all()
    users_restaurant = []
    for element in query:
        user_restaurant = element.serialize2()
        user_restaurant["rating"] = get_rating(user_restaurant["id"])
        users_restaurant.append(user_restaurant)

    return jsonify({"message": "Get favorites succesful!", "results": users_restaurant, "status": True}), 200

@api.route('/restaurant/search/category', methods=['GET'])
def get_restaurants_by_category():

    category = request.get_json()["category"]
    search = "%{}%".format(category)
    query = User_restaurant.query.filter(User_restaurant.category.ilike(search)).all()
    users_restaurant = []
    for element in query:
        user_restaurant = element.serialize2()
        user_restaurant["rating"] = get_rating(user_restaurant["id"])
        users_restaurant.append(user_restaurant)

    return jsonify({"message": "Get favorites succesful!", "results": users_restaurant, "status": True}), 200

@api.route('/user/send/url', methods=['POST'])
def send_url():
    request_body = request.get_json()

    server = smtplib.SMTP(host='smtp.gmail.com',port=587)

    user_serialize = None

    user_client = User_client.query.filter_by(email=request_body["email"]).first()
        
    if user_client:
        user=user_client
        user_serialize = user_client.serialize4()

    user_restaurant = User_restaurant.query.filter_by(email=request_body["email"]).first()

    if  user_restaurant:
        user=user_restaurant
        user_serialize = user_restaurant.serialize4()

    if user_serialize is None:
        return jsonify({"message": "Email does not exist", "status": False}), 200


    msg = MIMEMultipart()
    expiracion = datetime.timedelta(hours=1)
    access_token = create_access_token(identity=user_serialize, expires_delta=expiracion)
    access_token = access_token.replace(".", "$")
    print(access_token)
    message = "Ha solicitado cambiar su contraseña para el acceso al Sistema de My restaurant. Para proceder con el cambio, vaya a la siguiente dirección. \n Link: https://3000-azure-panther-f259lo9q.ws-us03.gitpod.io/change-password/"+access_token
    
    password = "GeeksB62021.."
    msg['From'] = "4geeksb6@gmail.com"
    msg['To'] = request_body["email"]
    msg['Subject'] = "Cambio de contraseña"
    
    msg.attach(MIMEText(message, 'plain'))
    
    server = smtplib.SMTP('smtp.gmail.com: 587')
    
    server.starttls()
    
    server.login(msg['From'], password)
    
    server.sendmail(msg['From'], msg['To'], msg.as_string())
    
    server.quit()

    return jsonify({"message": "Email sent", "status": True}), 200
    

@api.route('/user/change/password', methods=['PUT'])
@jwt_required()
def change_password():

    user = get_jwt_identity()
    password = request.json.get("password", None )

    if not password:
        return jsonify({"message":"Debe completar la información", "status": False}), 400

    if len(password) < 4:
        return jsonify({"message":"La contraseña debe contener más de 4 caracteres", "status": False}), 400

    if user["type_user"] == "client":
        user = User_client.query.get(user["id"])
        user.password = generate_password_hash(password)
        db.session.commit()
    else:
        user = User_restaurant.query.get(user["id"])
        user.password = generate_password_hash(password)
        db.session.commit()

    return jsonify({"message": "Password changed", "status": True}), 200

@api.route('/restaurant/change/information', methods=['PUT'])
@jwt_required()
def change_information():

    user = get_jwt_identity()

    if request.method == 'PUT':
        name = request.json.get("name", None)
        address = request.json.get("address", None)
        phone = request.json.get("phone", None)
        category = request.json.get("category", None)
        welcome_message = request.json.get("welcome_message", None)
        description = request.json.get("description", None)

        user_restaurant = User_restaurant.query.get(user["id"])
        user_restaurant.name = name
        user_restaurant.address = address
        user_restaurant.phone = phone
        user_restaurant.category = category
        user_restaurant.welcome_message = welcome_message
        user_restaurant.description = description
        db.session.commit()

    return jsonify({"message": "Information changed succese", "status": True}), 200

