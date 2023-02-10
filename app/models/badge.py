from .db import db

class Badge(db.Model):
    __tablename__ = 'badges'


    id = db.Column(db.Integer, primary_key=True)
    beer_id = db.Column(db.Integer, db.ForeignKey("beers.id"))
    brewery_id = db.Column(db.Integer, db.ForeignKey("breweries.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    icon = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)

    badge_beer = db.relationship("Beer", back_populates="beer_badge")
    badge_brewery = db.relationship("Brewery", back_populates="brewery_badge")
    badge_user = db.relationship("User", back_populates="user_badge")


    def to_dict(self):
        return {
            'id': self.id,
            'beer_id': self.beer_id,
            'brewery_id': self.brewery_id,
            'user_id': self.user_id,
            'icon': self.icon,
            'description': self.description
        }
