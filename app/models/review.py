from .db import db



class Review(db.Model):
    __tablename__ = "reviews"


    id = db.Column(db.Integer, primary_key=True)
    beer_id = db.Column(db.Integer, db.ForeignKey("beers.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    image = db.Column(db.String(255))
    review_text = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    review_beer = db.relationship("Beer", back_populates="beer_review")
    review_user = db.relationship("User", back_populates="user_review")

    def to_dict(self):
        return {
            'id': self.id,
            'beer_id': self.beer_id,
            'user_id': self.user_id,
            'image': self.image,
            'review_text': self.review_text,
            'rating': self.rating
        }