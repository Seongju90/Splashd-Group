from flask.cli import AppGroup
from .users import seed_users, undo_users
from .breweries import seed_breweries, undo_breweries
from .reviews import seed_reviews, undo_reviews
from .badges import seed_badges, undo_badges
from .beer import seed_beers, undo_beers
from .userbadges import seed_userbadges, undo_userbadges
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        # intially commented out undo userbadges to preserve database integrety
        undo_userbadges()
        undo_badges()
        undo_reviews()
        undo_beers()
        undo_breweries()
        undo_users()
    seed_users()
    seed_breweries()
    seed_beers()
    seed_reviews()
    seed_badges()
    seed_userbadges()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_badges()
    undo_reviews()
    undo_beers()
    undo_breweries()
    undo_users()
    # Add other undo functions here
