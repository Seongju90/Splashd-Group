from app.models import userbadges, db, environment, SCHEMA, User, Badge

def seed_userbadges():
    user1= User.query.get(1)
    badge1 = Badge.query.get(1)
    user1.user_badge.append(badge1)

    db.session.commit()

def undo_userbadges():
    # db.session.execute('TRUNCATE badges RESTART IDENTITY CASCADE;')
    # db.session.execute('DELETE FROM badges')
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.userbadges RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM userbadges")

    db.session.commit()
