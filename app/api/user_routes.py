from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, userbadges, Badge, db
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
# @login_required
def user_badges(id):
    """
        Query for a user's badges
    """
    sql = text('select * from userbadges')
    result = db.engine.execute(sql)

    list = []
    for r in result:
        if (r[0] == id):
            badge = Badge.query.get(r[1])
            list.append(badge.to_dict())

    return {'badges': list}

    # userId = id
    # badges = Badge.query.filter(userId.in_(Badge.badge_user)).all()

    # badges = Badge.query.join(Badge.badge_user).all()
    # badges = Badge.query.join(User.user_badge).all()
    # badges = badges.filter(badges.users == userId)
    # badges = User.query.all()

    # list = []
    # for badge in badges:
    #     i = badge.to_dict()
    #     print('iiiiiiiiiiiiiiiiiiiiiiiiiiiii', i)
    #     # print('bagdge', badge)
    #     # print('badge.badge_user', badge.badge_user)
    #     # print('badge.user_badge', User.user_badge)
    #     if (badge.badge_user == userId):
    #         list.append(badge)
    # badges = db.session.query(Badge) \
    #                    .join(User)  \
    #                    .filter(Badge.badge_user == id)
