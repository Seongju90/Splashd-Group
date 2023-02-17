from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
class Brewery(db.Model):
    __tablename__ = "breweries"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    city_state = db.Column(db.String(255), nullable=False)
    brewery_type = db.Column(db.String(255), nullable=False)
    brewery_logo = db.Column(db.String(255), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=False)
    created = db.Column(db.DateTime, default=datetime.utcnow)

    # todo:add cascade delete
    brewery_beer = db.relationship("Beer", back_populates="beer_brewery")
    brewery_user = db.relationship("User", back_populates="user_brewery")
    brewery_badge = db.relationship("Badge", back_populates="badge_brewery")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'owner_id': self.owner_id,
            'city_state': self.city_state,
            'brewery_type': self.brewery_type,
            'brewery_logo': self.brewery_logo
        }

    def all_info(self):
        return {
            'id': self.id,
            'name': self.name,
            'owner_id': self.owner_id,
            'city_state': self.city_state,
            'brewery_type': self.brewery_type,
            'brewery_logo': self.brewery_logo,
            'beers': [b.to_dict() for b in self.brewery_beer],
            'owner': self.brewery_user.to_dict(),
            'badges': [b.to_dict() for b in self.brewery_badge],
        }

    def delete_brewery(self):
        return {
            'beers':  self.brewery_beer,
            'badges':  self.brewery_badge,
        }
