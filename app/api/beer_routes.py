from flask import Blueprint, jsonify, session, request
from app.models import  db, Beer, Review, User, Brewery
from flask_login import current_user
from app.forms import BeerForm


beer_routes = Blueprint('beer', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# get all beers
@beer_routes.route('/all')
def get_beers():
    all_beers = Beer.query.all()
    all = []
    for beer in all_beers:
        beer = beer.to_dict()
        print("beer", beer)
        reviews = Review.query.filter(Review.beer_id == beer["id"]).all()
        beer["num_reviews"] = len(reviews)
        rating = 0
        for review in reviews:
            rating += review.rating
        beer["avg"] = rating/beer["num_reviews"]
        all.append(beer)
    print(all, "&&&&&&&&&&&&&&&&&&&&&&&&&")
    return {"beers": all}

@beer_routes.route('/<int:id>')
def get_one_beer(id):
    beer = Beer.query.get(id).to_dict()
    reviews = Review.query.filter(Review.beer_id == beer["id"]).from_self().all()
    brewery = Brewery.query.get(beer["brewery_id"]).to_dict()
    print(reviews, "11111111111111")
    beer["num_reviews"] = len(reviews)
    all = []
    rating = 0
    for review in reviews:
        review = review.to_dict()
        rating += review["rating"]
        user = User.query.get(review["user_id"])
        review["user"] = user.to_dict()
        all.append(review)
    beer["reviews"] = all
    beer["avg"] = rating/beer["num_reviews"]
    beer["brewery"] = brewery
    print(beer, "&&&&&&&&&&&&&&&&&&&&&&&&&")
    return beer
