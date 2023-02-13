from app.models import userbadges, db, environment, SCHEMA, User, Badge
import random

def seed_userbadges():
    all_users = User.query.all()
    # badges = Badge.query.all()
    for user in all_users:
        badge1 = Badge.query.get(random.randint(1,25))
        badge2 = Badge.query.get(random.randint(26,50))
        badge3 = Badge.query.get(random.randint(50,100))
        
        # user1.user_badge.append(badge1)
        user.user_badge.append(badge1)
        user.user_badge.append(badge2)
        user.user_badge.append(badge3)


        # new1 = userbadges(
        #     users=user.id,
        #     badges=badge1
        # )
        # new2 = userbadges(
        #     users=user.id,
        #     badges=badge2
        # )
        # new3 = userbadges(
        #     users=user.id,
        #     badges=badge3
        # )
        # db.session.add(new1)
        # db.session.add(new2)
        # db.session.add(new3)
    db.session.commit()

def undo_userbadges():
    # db.session.execute('TRUNCATE badges RESTART IDENTITY CASCADE;')
    # db.session.execute('DELETE FROM badges')
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.userbadges RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM userbadges")

    db.session.commit()
