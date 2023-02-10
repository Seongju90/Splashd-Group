from .db import db



class Beer(db.Model):
    __tablename__ = 'beers'


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    abv = db.Column(db.Float, nullable=False)
    ibu = db.Column(db.Integer, nullable=False)
    brewery_id = db.Column(db.Integer, db.ForeignKey("breweries.id"), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)

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
            'description': self.description
        }

# One to Many Relationship

# beers > reviews
# beer > badges
# brewery > badges
# brewery > beers
# user > reviews
# user > brewerys
# user > badges
