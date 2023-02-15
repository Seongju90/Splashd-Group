from .db import db, environment, SCHEMA, add_prefix_for_prod



class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    beer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("beers.id")), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    image = db.Column(db.String(255))
    review_text = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    # todo:add cascade delete
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


    def all_info(self):
        return {
            'id': self.id,
            'beer_id': self.beer_id,
            'user_id': self.user_id,
            'image': self.image,
            'review_text': self.review_text,
            'user':  self.review_user.to_dict(),
            'beer': self.review_beer.to_dict(),
        }
        