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
@app.route('/register', methods=["POST"])
def registro():
    if request.method == 'POST':
        username = request.json.get("username", None)
        email = request.json.get("email", None)
        password = request.json.get("password", None)

        if not username:
            return jsonify({"message": " El usuario es requerido"}), 400
        if not email:
            return jsonify({"message": " El email es requerido"}), 400
        if not password:
            return jsonify({"message": "La contraseña es requerida"}), 400

        user = User.query.filter_by(email=email).first()
        if user:
            return jsonify({"message": "Este nombre de usuario ya existe"}), 400

        user = User()
        user.email = email
        user.user = username
        hashed_password = generate_password_hash(password)

        user.password = hashed_password

        db.session.add(user)
        db.session.commit()

        return jsonify({"ok": "Gracias. se registro con exito", "status": "true"}), 200
    return jsonify(response_body), 200
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=PORT, debug=False)