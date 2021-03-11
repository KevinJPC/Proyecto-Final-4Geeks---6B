"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User_client, User_restaurant
from api.utils import generate_sitemap, APIException
import datetime

from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
api = Blueprint('api', __name__)
# jwt = JWTManager(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }
    return jsonify(response_body), 200


@api.route('/register/client', methods=["POST"])
def register():
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

        user = User_client.query.filter_by(email=email).first()
        print(user)
        if user:
            return jsonify({"message": "User already exist"}), 400

        user = User_client()
        user.name = name
        user.email = email
        hashed_password = generate_password_hash(password)

        user.password = hashed_password
        user.is_active = True

        db.session.add(user)
        db.session.commit()

        return jsonify({"ok": "Register succesful!", "status": "true"}), 200

# @api.route('/register_owner', methods=["POST"])
# def register_owner():
#     if request.method == 'POST':
#         name = request.json.get("name", None)
#         email = request.json.get("email", None)
#         password = request.json.get("password", None)
#         restaurant_name = request.json.get("restaurant_name", None)
#         adress = request.json.get("adress", None)
#         phone = request.json.get("phone", None)
#         category = request.json.get("category", None)

#         if not name:
#             return jsonify({"message": "Name required"}), 400

#         if not email:
#             return jsonify({"message": "Email required"}), 400

#         if not password:
#             return jsonify({"message": "Password required"}), 400

#         if not restaurant_name:
#             return jsonify({"message": "Restaurant name required"}), 400

#         if not adress:
#             return jsonify({"message": "Adress required"}), 400

#         if not phone:
#             return jsonify({"message": "Phone required"}), 400

#         if not category:
#             return jsonify({"message": "Category required"}), 400

#         name = User_client.query.filter_by(email=email).first()
#         print(name)
#         if name:
#             return jsonify({"message": "The user already exist"}), 400

#         user_client = Name()
#         user_client.email = email
#         user_client.name = name
#         user_client.restaurant_name = restaurant_name
#         user_client.adress = adress
#         user_client.phone = phone
#         user_client.category = category
#         hashed_password = generate_password_hash(password)

#         user_client.password = hashed_password

#         db.session.add(name)
#         db.session.commit()

#         return jsonify({"ok": "Register succesful!", "status": "true"}), 200

#     return jsonify(response_body), 200


# @api.route('/login_user', methods=['POST'])
# def login_client_user():
#     if request.method == 'POST':
#         email = request.json.get("email", None)
#         password = request.json.get("password", None)

#         if not email:
#             return jsonify({"message": "Email required"}), 400

#         if not password:
#             return jsonify({"message": "Password required"}), 400

#         name = User_client.query.filter_by(email=email).first()

#         if not name:
#             return jsonify({"message": "The name is incorrect"}), 401

#         if not check_password_hash(name.password, password):
#             return jsonify({"message": "The password is incorrect"}), 401

#         expiracion = datetime.timedelta(days=1)
#         access_token = create_access_token(identity=name.id, expires_delta=expiracion)

#         print("test")
#         data = {
#             "name": name.serialize(),
#             "token": access_token,
#             "expires": expiracion.total_seconds()*1000
#         }

#         return jsonify(data), 200


# @api.route('/login_owner', methods=['POST'])
# def login_client_user():
#     if request.method == 'POST':
#         email = request.json.get("email", None)
#         password = request.json.get("password", None)

#         if not email:
#             return jsonify({"message": "Email required"}), 400

#         if not password:
#             return jsonify({"message": "Password required"}), 400

#         name = User_client.query.filter_by(email=email).first()

#         if not name:
#             return jsonify({"message": "The name is incorrect"}), 401

#         if not check_password_hash(name.password, password):
#             return jsonify({"message": "The password is incorrect"}), 401

#         expiracion = datetime.timedelta(days=1)
#         access_token = create_access_token(identity=name.id, expires_delta=expiracion)

#         print("test")
#         data = {
#             "name": name.serialize(),
#             "token": access_token,
#             "expires": expiracion.total_seconds()*1000
#         }

#         return jsonify(data), 200


# @api.route('/menu_items', methods=['GET'])
# def get_all_items():

#     query = Menu_items.query.all()
#     results = list(map(lambda menu_items: menu_items.serialize(), query))
#     response_body = {
#         "message": results
#     }
#     return jsonify(response_body), 200
