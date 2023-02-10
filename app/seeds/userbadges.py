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

    db.session.add(ub1)
    db.session.add(ub2)
    db.session.commit()

def undo_userbadges():
    # db.session.execute('TRUNCATE badges RESTART IDENTITY CASCADE;')
    # db.session.execute('DELETE FROM badges')
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.userbadges RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM userbadges")

    db.session.commit()
