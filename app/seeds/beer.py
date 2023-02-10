from app.models import db, Beer, environment, SCHEMA


def seed_beers():

    beer1=Beer(
        name='Hello',
        abv=4.1,
        ibu=10,
        brewery_id=1,
        type='Wheat',
        description='This was great!',
        beer_logo= "dddddasassas"
    )
    beer2 = Beer(
        name='World',
        abv=3.2,
        ibu=5,
        brewery_id=2,
        type='Milk',
        description='This was bad!',
        beer_logo= "dddddasassas"
    )

    beer3 = Beer(
        name='Bye',
        abv=2.2,
        ibu=3,
        brewery_id=1,
        type='Rice',
        description='This was mysterious!',
        beer_logo= "dddddasassas"
    )
    db.session.add(beer1)
    db.session.add(beer2)
    db.session.add(beer3)
    db.session.commit()

def undo_beers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.beers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM beers")

    # db.session.execute('TRUNCATE beers RESTART IDENTITY CASCADE;')
    db.session.commit()
