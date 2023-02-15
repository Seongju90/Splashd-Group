from flask import Blueprint, jsonify, session, request
from app.models import  db, Beer, Review, User, Brewery, Badge
from flask_login import current_user, login_required
from app.forms import BeerForm, ReviewForm


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
    beers = Beer.query.limit(20).all()
    # all = []
    # for beer in all_beers:
    #     beer = beer.to_dict()
    #     print("beer", beer)
    #     reviews = Review.query.filter(Review.beer_id == beer["id"]).all()
    #     beer["num_reviews"] = len(reviews)
    #     rating = 0
    #     for review in reviews:
    #         rating += review.rating
    #     if len(reviews):
    #         beer["avg"] = rating/beer["num_reviews"]
    #     else:
    #         beer["avg"] = 0

    #     all.append(beer)
    # # print(all, "&&&&&&&&&&&&&&&&&&&&&&&&&")
    # return {"beers": all}
    return {'beers':[b.all_info() for b in beers]}

@beer_routes.route('/<int:id>')
def get_one_beer(id):
    beer = Beer.query.get(id).to_dict()
    reviews = Review.query.filter(Review.beer_id == beer["id"]).from_self().all()
    brewery = Brewery.query.get(beer["brewery_id"]).to_dict()
    # print(reviews, "11111111111111")
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
    # print(beer, "&&&&&&&&&&&&&&&&&&&&&&&&&")
    return beer

@beer_routes.route('/<int:id>/', methods = ['DELETE'])
@login_required
def delete_beer(id):
    beer = Beer.query.get(id)
    reviews = Review.query.filter(Review.beer_id == beer.id).all()
    badges = Badge.query.filter(Badge.beer_id == beer.id).all()
    for review in reviews:
        db.session.delete(review)
    for badge in badges:
        db.session.delete(badge)
    db.session.commit()
    db.session.delete(beer)
    db.session.commit()
    return {"message": f'beer with id {beer.id} successfully deleted'}

@beer_routes.route('', methods = ['POST'])
@login_required
def addBeer():
    form = BeerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data, '!^!^!^!^!^!^^!^!^!^^!^!^!^!^^!^!^!^!^!^')
    print(current_user, current_user.id, '@^@^@^@^@^^@^@^@^@^@^^@^@^^@^@^@^^@@')
    if form.validate_on_submit():

        newBeer = Beer(
            name=form.data['name'],
            owner_id=current_user.id,
            abv=form.data['abv'],
            brewery_type=form.data['brewery_type'],
            brewery_logo=form.data['brewery_logo']
        )
        print(newBeer, '*^*^*^*^*^*^*^*^*^*^**^*^*^*^*^*')
        db.session.add(newBeer)
        db.session.commit()
        return  newBeer.to_dict()
    print(form.errors, '&#&#&#&#&#&#&#&#&#&#&&#&#&#&#&#&#&&#')
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Create a review based on Beer id, need to change API/route
@beer_routes.route('/<int:id>/review', methods=['POST'])
@login_required
def create_review(id):
    """
        Create a review for a beer
    """
    form = ReviewForm()
    print(form.data)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        print('@@@&!&!&!&!&!&!&!!&!&!&!!&!&!!&!&!&!',request.data)

        newReview = Review(
            beer_id=id,
            user_id=current_user.id,
            image=form.data['image'],
            review_text=form.data['review_text'],
            rating=form.data['rating']
        )

        db.session.add(newReview)
        db.session.commit()


        # check badges
        user = User.query.get(current_user.id)
        # when more badges exist for each beer we can have a list of beer badges
        earned_badges = Badge.query.filter(Badge.beer_id == id).all()

        newReview = newReview.to_dict()
        newReview['badges_earned'] = []

        for badge in earned_badges:
            print(badge, "checking if you earned any badges for this beer")
            if not badge.id in user.badge_info()["badges"]:
                print("badge earned!!!!!!!!!!!!!!!!!!!!!!")
                user.user_badges.append(badge)
                newReview['badges_earned'].append(badge.id)

        db.session.commit()

        return newReview
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
