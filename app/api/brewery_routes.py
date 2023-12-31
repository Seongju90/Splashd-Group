from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Brewery, db, Beer, Badge
from app.forms import BreweryForm, BeerForm, BadgeForm
from app.api.auth_routes import validation_errors_to_error_messages

brewery_routes = Blueprint('brewery', __name__)



# update brewery route
@brewery_routes.route('/<int:id>', methods=['PUT'])
@login_required
def I_believe_brew_can_change(id):
    # print('asdkjasdjkasda')
    form = BreweryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print(form.data, 'bbb!^!^!^!^!^!^^!^!^!^^!^!^!^!^^!^!^!^!^!^')
    # print(current_user, current_user.id, '@^@^@^@^@^^@^@^@^@^@^^@^@^^@^@^@^^@@')
    if form.validate_on_submit():
        brew = Brewery.query.get(id)
        brew.name=form.data['name']
        brew.city_state=form.data['city_state']
        brew.brewery_type=form.data['brewery_type']
        # brew.description=form.data['description']
        brew.description=request.json['description']
        brew.brewery_logo=form.data['brewery_logo']

        db.session.commit()
        return  brew.all_info()
    # print(form.errors, 'bbb&#&#&#&#&#&#&#&#&#&#&&#&#&#&#&#&#&&#')
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#delete brewery route
@brewery_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def bye_bye_brew(id):
    brew = Brewery.query.get(id)
    if (brew) and (brew.owner_id == current_user.id):
        info = brew.delete_brewery()
        [db.session.delete(b)for b in info['beers']]
        for badge in info['badges']:
            badge.beer_id = None
            badge.brewery_id = None
        db.session.commit()
        return {
            'message': 'Successfully Deleted'
        }
    else:
        return {'errors': ['Something went wrong']}, 401


@brewery_routes.route('/all')
def brewerys():
    """
    Query for all brewerys and returns them in a list of brewery dictionaries
    """
    breweries = Brewery.query.all()
    # return {'breweries': [brewery.to_dict() for brewery in breweries]}
    return {'breweries':[brewery.all_info() for brewery in breweries]}

@brewery_routes.route('/<int:id>')
def brewery(id):
    """
    Query for all brewerys and returns them in a list of brewery dictionaries
    """
    brewery = Brewery.query.get(id).all_info()
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
        # beer.description=form.data['description']
        beer.description=request.json['description']
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
    if form.validate_on_submit():

        newBeer = Beer(
            name=form.data['name'],
            abv=form.data['abv'],
            ibu=form.data['ibu'],
            brewery_id=id,
            type=form.data['type'],
            description=request.json['description'],
            beer_logo=form.data['beer_logo']
        )
        db.session.add(newBeer)
        db.session.commit()
        return  {'beer':newBeer.to_dict(), 'id':current_user.id}
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
            description=request.json['description'],
            brewery_logo=form.data['brewery_logo']
        )
        # print(newbrewery, '*^*^*^*^*^*^*^*^*^*^**^*^*^*^*^*')
        db.session.add(newbrewery)
        db.session.commit()
        return  newbrewery.to_dict()
    # print(form.errors, '&#&#&#&#&#&#&#&#&#&#&&#&#&#&#&#&#&&#')
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@brewery_routes.route('/<int:id>/badge', methods = ["POST"])
# @login_required
def get_brewery_badges(id):
    beer = Beer.query.get(id).all_info()

    # if not beer:
    #     return jsonify({
    #     "message": "Beer not found",
    #     "status_code": 404
    #     }), 404

    owner_id = beer["brewery"]["owner_id"]
    # print("!!!!!!!!!!!!!!!!!", brewery, ">>>>>>>>>>>>>>", beer)
    if current_user.id == owner_id:
        form = BadgeForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():

            new_badge = Badge(
                beer_id = beer['id'],
                brewery_id = beer['brewery']['id'],
                icon = form.data["icon"],
                description = request.json["description"]
            )
            db.session.add(new_badge)
            db.session.commit()
            return new_badge.to_dict()
    return { 'errors': 'Post failed please try again'}, 401
