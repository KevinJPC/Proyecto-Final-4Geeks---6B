from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User_client(db.Model):
    __tablename__ = 'User_client'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
  
   
    def serialize(self):
        return {
            "id": self.id,
            "name": self.client_name,
            "email": self.email,
            "is_active": self.is_active,
        }

class User_restaurant(db.Model):
    __tablename__ = 'User_restaurant' 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    image = db.Column(db.String(80), unique=False, nullable=False)
    adress = db.Column(db.String(250), unique=False, nullable=False)
    phone = db.Column(db.String(30), unique=False, nullable=False)
    category = db.Column(db.String(150), unique=False, nullable=False)
    welcome_message = db.Column(db.String(150), unique=False, nullable=False)
    description = db.Column(db.String(150), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

   
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "image": self.image,
            "adress": self.adress,
            "phone": self.phone,
            "category": self.category,
            "welcome_message": self.welcome_message,
            "description": self.description,
            "is_active": self.is_active
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
# class Client-review(db.Model):
#     __tablename__ = 'Client-review' 
#     id = db.Column(db.Integer, primary_key=True)
#     client_id= db.Column(db.Integer(120), unique=False, nullable=False, ForeignKey('User_client.client_id'))
#     owner_id = db.Column(db.Integer, unique=False, nullable=False, ForeignKey('User_owner.owner_id'))
#     rating = db.Column(db.integer(100), unique=False, nullable=False)
#     review = db.Column(db.String(200), unique=False, nullable=False)
#     user_owner=relationship(User_owner)
#     user_client=relationship(User_client)
    
#     def serialize(self):
#         return {
#             "id": self.id,
#             "client_id": self.client_id,
#             "owner_id": self.owner_id,
#             "rating": self.rating,
#             "review": self.review,
#          }