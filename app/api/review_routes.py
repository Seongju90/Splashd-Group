from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review, Beer, db, User, Brewery
from app.forms import ReviewForm, EditReviewForm
from app.api.auth_routes import validation_errors_to_error_messages


review_routes = Blueprint('reviews', __name__)

# Get all reviews by beer id (should be on beer route)
# /<int:id>/reviews later this is the route
@review_routes.route('/<int:review_id>')
def one_review(review_id):
    """
    Query for single review of a beer
    """
    review = Review.query.get(review_id)

    if not review:
        return jsonify({
            "message": "Review not found",
            "status_code": 404
        }), 404

    review_dict = review.to_dict()

    # To test if beer is not found comment in beer = None
    # beer = None
    beer = Beer.query.get(review.beer_id)

    if not beer:
        return jsonify({
        "message": "Beer not found",
        "status_code": 404
        }), 404


    # if beer exists get the name
    beer_name = beer.name

    # beer = Beer.query.get(review_dict['beer_id']), both ways work to extract data from beer

    brewery = Brewery.query.get(beer.brewery_id)
    brewery_name = brewery.name

    user = User.query.get(review.user_id)
    user_dict = user.to_dict()

    review_dict['beer_name'] = beer_name
    review_dict['user_name'] = user_dict
    review_dict['brewery_name'] = brewery_name

    return review_dict


@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_review(id):
    """
        Edit a review for a beer
    """
    # get the edit form and csrf token
    form = EditReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    userId = current_user.id
    review = Review.query.get(id)

    # if review is not found, throw an error
    if not review:
        return jsonify({
            "message": "Review not found",
            "status_code": 404
        }), 404

    # check to see if the reviewId.user_id is == to the current_userId
    if not (userId == review.user_id):
        return jsonify({
            "message": "You are not the owner of the review",
            "status_code": 401
        }), 401

    if form.validate_on_submit():

        review.image = form.data['image']
        review.review_text = form.data['review_text']
        review.rating = form.data['rating']

        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    """
    Delete a review for a beer
    """
    userId = current_user.id
    review = Review.query.get(id)

    # if review is not found, throw an error
    if not review:
        return jsonify({
            "message": "Review not found",
            "status_code": 404
        }), 404


    # if the current_userid is user of the review allow delete
    if (userId == review.user_id):
        db.session.delete(review)
        db.session.commit()

        return jsonify({
            "message": "Successfully deleted the review"
        })
    else:
        return jsonify({
            "message": "Forbidden, you are not the owner of the review",
            "status_code": 403
        }), 403


# Create a review based on Beer id, need to change API/route
# @beer_routes.route('/create/<int:beers_id>', methods=['POST'])
# @login_required
# def create_review(beers_id):
#     """
#         Create a review for a beer
#     """
#     form = ReviewForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():

#         newReview = Review(
#             beer_id=beers_id,
#             user_id=current_user.id,
#             image=form.data['image'],
#             review_text=form.data['review_text'],
#             rating=form.data['rating']
#         )

#         db.session.add(newReview)
#         db.session.commit()
#         return newReview.to_dict()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401
