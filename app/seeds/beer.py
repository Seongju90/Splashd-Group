from app.models import db, Beer


def seed_beers():

    beer1=Beer(
        name='Hello',
        abv=4.1,
        ibu=10,
        brewery_id=1,
        type='Wheat',
        description='This was great!'
    )
    beer2 = Beer(
        name='World',
        abv=3.2,
        ibu=5,
        brewery_id=2,
        type='Milk',
        description='This was bad!'
    )

    beer3 = Beer(
        name='Bye',
        abv=2.2,
        ibu=3,
        brewery_id=1,
        type='Rice',
        description='This was mysterious!'
    )
    db.session.add(beer1)
    db.session.add(beer2)
    db.session.add(beer3)
    db.session.commit()

def undo_beers():
    db.session.execute('DELETE FROM beers')

    # db.session.execute('TRUNCATE beers RESTART IDENTITY CASCADE;')
    db.session.commit()