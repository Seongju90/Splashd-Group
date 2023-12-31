from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, userbadges, Badge, db, Review, Brewery
from sqlalchemy import text

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/badges')
@login_required
def user_badges(id):
    """
        Query for a user's badges
    """
    user = User.query.get(id).all_info()

    return {'badges': user['badges']}

    # Another way to query many-many table injecting raw sql

    # sql = text('select * from userbadges')
    # result = db.engine.execute(sql)

    # list = []
    # for r in result:
    #     if (r[0] == id):
    #         badge = Badge.query.get(r[1])
    #         list.append(badge.to_dict())


@user_routes.route('/<int:id>/brewery')
@login_required
def user_breweries(id):
    """
    Route to query all users' breweries
    """
    # user = User.query.get(id).all_info()
    breweries = Brewery.query.filter(Brewery.owner_id == current_user.id).all()
    breweries = [b.beer_card() for b in breweries]
    
    # for brew in breweries:

    #     ret_brew = [b.beer_card() for b in brew["beers"]]
    #     brew.beers = ret_brew
    # print("???????????????????", ret_brew)

    return {"Breweries": breweries}


@user_routes.route('/<int:id>/reviews')
@login_required
def user_reviews(id):
    """
    Route to query all user's reviews
    """
    # user = User.query.get(id).all_info()
    # return { "Reviews": user['reviews']}

    reviews = Review.query.filter(Review.user_id == id)

    return { "Reviews": [r.all_info() for r in reviews]}
