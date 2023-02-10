from app.models import userbadge, db, environment, SCHEMA

def seed_userbadges():
    ub1= userbadge(
        users=1,
        badges=1
    )
    ub2= userbadge(
        users=1,
        badges=2
    )
