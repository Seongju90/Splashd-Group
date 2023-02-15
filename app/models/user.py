from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .userbadge import userbadges


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)

    # todo:add cascade delete
    user_brewery = db.relationship("Brewery", back_populates="brewery_user")
    # user_badge = db.relationship("Badge", secondary=userbadges, back_populates="badge_user")
    user_badges = db.relationship("Badge", secondary=userbadges, back_populates="badge_users")
    user_review = db.relationship("Review", back_populates="review_user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'name': f'{self.first_name} {self.last_name}',
            'age': self.age,
            # addition of the user_badge relationship column, will give us access to many to many table
            # can use to_dict() from badges onto here
            # 'user_badges': [badges.to_dict() for badges in self.user_badges]
        }

    def all_info(self):
         return {
            'id': self.id,
            'username': self.username,
            'name': f'{self.first_name} {self.last_name}',
            'age': self.age,
            'badges': [b.to_dict() for b in self.user_badges],
            'reviews':[b.to_dict() for b in self.user_review],
            'breweries': [b.all_info() for b in self.user_brewery],
        }

    def badge_info(self):
        return {
            'badges': [b.id for b in self.user_badges],
        }
