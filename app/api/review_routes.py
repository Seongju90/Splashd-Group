from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review, Beer, db, User, Brewery
from app.forms import ReviewForm
from app.api.auth_routes import validation_errors_to_error_messages


review_routes = Blueprint('reviews', __name__)

# Get all reviews by beer id (should be on beer route)
# /<int:id>/reviews later this is the route
@review_routes.route('/<int:id>')
def one_review(id):
    """
    Query for single review of a beer
    """
    # user name
    # review info

    review = Review.query.get(id)
    review_dict = review.to_dict()

    # beer = Beer.query.get(review_dict['beer_id']), both ways work to extract data from beer
    beer = Beer.query.get(review.beer_id)
    beer_name = beer.name

    brewery = Brewery.query.get(beer.brewery_id)
    brewery_name = brewery.name

    user = User.query.get(review.user_id)
    user_dict = user.to_dict()

    review_dict['beer_name'] = beer_name
    review_dict['user_name'] = user_dict
    review_dict['brewery_name'] = brewery_name

    return review_dict


## Copy and send over to the beer routes folder, 
## we will be making a post through the beers page
@review_routes.route('/create/<int:id>', methods=['POST'])
@login_required
def create_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        newReview = Review(
            beer_id=id,
            user_id=current_user.id,
            image=form.data['image'],
            review_text=form.data['review_text'],
            rating=form.data['rating']
        )
        print(newReview)
        db.session.add(newReview)
        db.session.commit()
        return newReview.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
