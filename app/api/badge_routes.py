from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Badge

badge_routes = Blueprint('badge', __name__)

@badge_routes.route('/all')
@login_required
def get_badges():
    badges = Badge.query.all()
    return {'badges':[b.all_info() for b in badges]}
