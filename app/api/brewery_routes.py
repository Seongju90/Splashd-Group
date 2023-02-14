from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Brewery, db, Beer
from app.forms import BreweryForm, BeerForm
from app.api.auth_routes import validation_errors_to_error_messages

brewery_routes = Blueprint('brewery', __name__)

@brewery_routes.route('/all')
def brewerys():
    """
    Query for all brewerys and returns them in a list of brewery dictionaries
    """
    breweries = Brewery.query.all()
    # return {'breweries': [brewery.to_dict() for brewery in breweries]}
    return {'breweries':[brewery.to_dict() for brewery in breweries]}

@brewery_routes.route('/<int:id>')
def brewery(id):
    """
    Query for all brewerys and returns them in a list of brewery dictionaries
    """
    brewery = Brewery.query.get(id).all_info_dict()
    return  brewery

# update beer route
@brewery_routes.route('/<int:id>/beers/<int:beerId>/', methods=['PUT'])
@login_required
def editBeer(id, beerId):
    # print('asdkjasdjkasda')
    form = BeerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print(form.data, 'bbb!^!^!^!^!^!^^!^!^!^^!^!^!^!^^!^!^!^!^!^')
    # print(current_user, current_user.id, '@^@^@^@^@^^@^@^@^@^@^^@^@^^@^@^@^^@@')
    if form.validate_on_submit():
        beer = Beer.query.get(beerId)

        print(beer, 'bbb*^*^*^*^*^*^*^*^*^*^**^*^*^*^*^*')

        beer.name=form.data['name']
        beer.abv=form.data['abv']
        beer.ibu=form.data['ibu']
        beer.type=form.data['type']
        beer.description=form.data['description']
        beer.beer_logo=form.data['beer_logo']

        print(beer, 'bbb*^*^*^*^*^*^*^*^*^*^**^*^*^*^*^*')

        db.session.commit()
        return  beer.to_dict()
    # print(form.errors, 'bbb&#&#&#&#&#&#&#&#&#&#&&#&#&#&#&#&#&&#')
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@brewery_routes.route('/<int:id>/beers', methods=['POST'])
@login_required
def addBeer(id):
    # print('asdkjasdjkasda')
    form = BeerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print(form.data, 'bbb!^!^!^!^!^!^^!^!^!^^!^!^!^!^^!^!^!^!^!^')
    # print(current_user, current_user.id, '@^@^@^@^@^^@^@^@^@^@^^@^@^^@^@^@^^@@')
    if form.validate_on_submit():

        newBeer = Beer(
            name=form.data['name'],
            abv=form.data['abv'],
            ibu=form.data['ibu'],
            brewery_id=id,
            type=form.data['type'],
            description=form.data['description'],
            beer_logo=form.data['beer_logo']
        )
        # print(newBeer, 'bbb*^*^*^*^*^*^*^*^*^*^**^*^*^*^*^*')
        db.session.add(newBeer)
        db.session.commit()
        return  newBeer.to_dict()
    # print(form.errors, 'bbb&#&#&#&#&#&#&#&#&#&#&&#&#&#&#&#&#&&#')
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@brewery_routes.route('', methods=['POST'])
@login_required
def addbrewery():
    form = BreweryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print(form.data, '!^!^!^!^!^!^^!^!^!^^!^!^!^!^^!^!^!^!^!^')
    # print(current_user, current_user.id, '@^@^@^@^@^^@^@^@^@^@^^@^@^^@^@^@^^@@')
    if form.validate_on_submit():

        newbrewery = Brewery(
            name=form.data['name'],
            owner_id=current_user.id,
            city_state=form.data['city_state'],
            brewery_type=form.data['brewery_type'],
            brewery_logo=form.data['brewery_logo']
        )
        # print(newbrewery, '*^*^*^*^*^*^*^*^*^*^**^*^*^*^*^*')
        db.session.add(newbrewery)
        db.session.commit()
        return  newbrewery.to_dict()
    # print(form.errors, '&#&#&#&#&#&#&#&#&#&#&&#&#&#&#&#&#&&#')
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
