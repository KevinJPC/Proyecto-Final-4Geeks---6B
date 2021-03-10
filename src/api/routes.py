"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

@api.route('/register', methods=["POST"])
def register():
    if request.method == 'POST':
        user = request.json.get("user", None)
        email = request.json.get("email", None)
        password = request.json.get("password", None)

        if not user:
            return jsonify({"message": "User required"}), 400

        if not email:
            return jsonify({"message": "Email required"}), 400

        if not password:
            return jsonify({"message": "Password required"}), 400

        # user = User.query.filter_by(email=email).first()
        # print(user)
        # if user:
        #     return jsonify({"message": "User already exist"}), 400

        user = User()
        user.email = email
        user.user = user
        hashed_password = generate_password_hash(password)

        user.password = hashed_password

        # db.session.add(user)
        # db.session.commit()

        return jsonify({"ok": "Register succesful!", "status": "true"}), 200

    return jsonify(response_body), 200