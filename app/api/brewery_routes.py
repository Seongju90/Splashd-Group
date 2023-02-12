from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Brewery

brewery_routes = Blueprint('brewery', __name__)

@brewery_routes.route('')
def brewerys():
    """
    Query for all brewerys and returns them in a list of brewery dictionaries
    """
    breweries = Brewery.query.all()
    return {'breweries': [brewery.to_dict() for brewery in breweries]}


@brewery_routes.route('/<int:id>')
def brewery(id):
    """
    Query for all brewerys and returns them in a list of brewery dictionaries
    """
    brewery = Brewery.query.get(id)
    return {'brewery': brewery.to_dict()}
