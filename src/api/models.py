from flask_sqlalchemy import SQLAlchemy
import datetime
db = SQLAlchemy()

class User_client(db.Model):
    __tablename__ = 'User_client'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
  
   
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "type_user": "client",
            "is_active": self.is_active,
        }
        
    def serialize2(self):
        return {
            "name": self.name
        }

    def serialize3(self):
        return {
            "rating": self.rating
        }

    def serialize4(self):
        return {
            "id": self.id,
            "type_user": "client"
        }

class User_restaurant(db.Model):
    __tablename__ = 'User_restaurant' 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    image_url = db.Column(db.String(250), unique=False, nullable=True)
    address = db.Column(db.String(100), unique=False, nullable=False)
    phone = db.Column(db.String(50), unique=False, nullable=False)
    category = db.Column(db.String(50), unique=False, nullable=False)
    welcome_message = db.Column(db.String(50), unique=False, nullable=False)
    description = db.Column(db.String(400), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

   
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "image_url": self.image_url,
            "address": self.address,
            "phone": self.phone,
            "category": self.category,
            "welcome_message": self.welcome_message,
            "description": self.description,
            "type_user": "restaurant",
            "is_active": self.is_active
        }
    
    def serialize2(self):
        return {
            "id": self.id,
            "name": self.name,
            "image_url": self.image_url,
            "address": self.address,
            "category": self.category,
            # "rating": "3",
            "type_user": "restaurant"
        }

    def serialize3(self):
        return {
            "id": self.id
        }

    def serialize4(self):
        return {
            "id": self.id,
            "type_user": "restaurant"
        }

class Review(db.Model):
    __tablename__ = 'review' 
    id = db.Column(db.Integer, primary_key=True)
    user_client_id = db.Column(db.Integer, db.ForeignKey('User_client.id'), nullable=False)
    user_client = db.relationship(User_client)
    user_restaurant_id = db.Column(db.Integer, db.ForeignKey('User_restaurant.id'), nullable=False)
    user_restaurant = db.relationship(User_restaurant)
    comment = db.Column(db.String, unique=False, nullable=True)
    rating = db.Column(db.Integer, unique=False, nullable=False)
    date = db.Column(db.DateTime, default=datetime.datetime.utcnow, nullable=False)

    def __init__(self, user_client_id, user_restaurant_id, comment, rating):
        self.user_client_id = user_client_id
        self.user_restaurant_id = user_restaurant_id
        self.comment = comment
        self.rating = rating
        

    def serialize(self):
        return {
            "id": self.id,
            "user_client_id": self.user_client_id,
            "user_client_name": self.user_client.name,
            "user_restaurant_id": self.user_restaurant_id,
            "comment": self.comment,
            "rating": self.rating,
            "date": self.date
        }

    def serialize2(self):
        return {
            "rating": self.average
        }

class Favorite_restaurants(db.Model):
    __tablename__ = 'Favorite_restaurants' 
    user_client_id = db.Column(db.Integer, db.ForeignKey('User_client.id'), primary_key=True)
    user_client = db.relationship(User_client)
    user_restaurant_id = db.Column(db.Integer, db.ForeignKey('User_restaurant.id'), primary_key=True)
    user_restaurant = db.relationship(User_restaurant)

    def __init__(self, user_client_id, user_restaurant_id):
        self.user_client_id = user_client_id
        self.user_restaurant_id = user_restaurant_id

    def serialize(self):
        return {
            "user_client_id": self.user_client_id,
            "user_restaurant_name": self.user_restaurant.name,
            "user_restaurant_id": self.user_restaurant_id,
            "user_restaurant_image_url": self.user_restaurant.image_url,
            "user_restaurant_address": self.user_restaurant.address,
            "user_restaurant_category": self.user_restaurant.category
        }

    def serialize2(self):
        return {
            "user_client_id": self.user_client_id,
            "user_restaurant_id": self.user_restaurant_id
        }
# class Menu_items(db.Model):
#     __tablename__ = 'Menu_items' 
#     id = db.Column(db.Integer, primary_key=True)
#     owner_id = db.Column(db.Integer, unique=True, nullable=False, ForeignKey('User_owner.owner_id'))
#     client_id= db.Column(db.Integer(120),unique=True, nullable=False, ForeignKey('User_client.client_id'))
#     id_menu = db.Column(db.Integer(100), unique=True, nullable=False)
#     name = db.Column(db.String(150), unique=False, nullable=False)
#     description = db.Column(db.String(150), unique=False, nullable=False)
#     image = db.Column(db.String(200), unique=False, nullable=False)
#     price = db.Column(db.String(30), unique=False, nullable=False)
#     class_id = db.Column(db.String(150), unique=False, nullable=False)
#     user_owner=relationship(User_owner)
#     user_client=relationship(User_client)

#     def serialize(self):
#         return {
#             "id": self.id,
#             "owner_id": self.owner_id,
#             "client_id": self.client_id,
#             "id_menu": self.id_menu,
#             "name": self.name,
#             "description": self.description,
#             "image": self.image,
#             "price": self.price,
#             "class_id": self.class_id,
                  
#         }