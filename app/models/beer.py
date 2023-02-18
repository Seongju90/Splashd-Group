from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Beer(db.Model):
    __tablename__ = 'beers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    abv = db.Column(db.Float, nullable=False)
    ibu = db.Column(db.Integer, nullable=False)
    brewery_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("breweries.id")), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    beer_logo = db.Column(db.String(255), nullable=False)
    created = db.Column(db.DateTime, default=datetime.utcnow)

    # todo:add cascade delete
    beer_brewery = db.relationship("Brewery", back_populates="brewery_beer")
    beer_review = db.relationship("Review", back_populates="review_beer")
    beer_badge = db.relationship("Badge", back_populates="badge_beer")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'abv': self.abv,
            'ibu': self.ibu,
            'brewery_id': self.brewery_id,
            'type': self.type,
            'description': self.description,
            'beer_logo': self.beer_logo
        }

    def all_info(self):
        # List comprehension is passing in information we need into a new K:V when we call this function
        # badge_post() is located in brewery.py, using it to attach all information to brewery in the beer query
        return {
            'id': self.id,
            'name': self.name,
            'abv': self.abv,
            'ibu': self.ibu,
            'brewery_id': self.brewery_id,
            'type': self.type,
            'description': self.description,
            'beer_logo': self.beer_logo,
            'brewery': self.beer_brewery.all_info(),
            'reviews': [rev.to_dict() for rev in self.beer_review],
            'badges': [badge.to_dict() for badge in self.beer_badge]
        }

    def beer_card(self):
        n = 0
        for r in self.beer_review:
            n += r.rating
        avg = self.beer_review
        if len(avg):
            avg = n/len(avg)
        else:
            avg = 0
        return {
        'id': self.id,
        'name': self.name,
        'abv': self.abv,
        'ibu': self.ibu,
        'brewery_id': self.brewery_id,
        'type': self.type,
        'description': self.description,
        'beer_logo': self.beer_logo,
        'num_reviews': len(self.beer_review),
         'avg': avg,
        }
# One to Many Relationship

# beers > reviews
# beer > badges
# brewery > badges
# brewery > beers
# user > reviews
# user > brewerys
# user > badges
