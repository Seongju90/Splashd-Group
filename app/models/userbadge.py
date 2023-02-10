from .db import db, environment, SCHEMA, add_prefix_for_prod


userbadges = db.Table(
    'userbadges',
    db.Model.metadata,
    db.Column('users', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True ),
    db.Column('badges', db.Integer, db.ForeignKey(add_prefix_for_prod('badges.id')), primary_key=True )
)


if environment == "production":
    user_badges.schema = SCHEMA
