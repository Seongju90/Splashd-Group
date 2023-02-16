from app.models import db, User, environment, SCHEMA
from random import randint
def seed_users():
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    pics = [
    "https://assets.untappd.com/profile/5b2f40c0cc771050e78a0403e9d01d62_100x100.jpg",
    "https://assets.untappd.com/profile/aa7641777257b85f9d015824df71ef68_100x100.jpg",
    "https://assets.untappd.com/profile/7c52e7fe09db055170e44eeaa1ac764d_100x100.jpg",
    "https://assets.untappd.com/profile/b77cefa841366708295257e3d46ee8da_100x100.jpg",
    "https://assets.untappd.com/profile/b3480f01b36eaf6ada1419accdb14368_100x100.jpg",
    "https://assets.untappd.com/profile/ddefd96fb6615df39799a57dca07a750_thumb.jpg",
    "https://assets.untappd.com/profile/490573f8d2e0d3bcae7a39067df8b040_thumb.jpg",
    "https://assets.untappd.com/profile/273f5de8d06c475f9c28c2211f75c2a4_100x100.jpg",
    "https://assets.untappd.com/profile/2c3289574bbdc3d7ff0514e8c0ea8df0_100x100.jpg",
    "https://assets.untappd.com/profile/d36696204453618a46cbcb0b3df2f75e_100x100.jpg",
    "https://assets.untappd.com/profile/71bf1c7cd67ce628af9c3d964feba3e9_100x100.jpg",
    "https://assets.untappd.com/profile/a3cc984d9f0cbc42ee55145ca3c6fbe4_100x100.jpg",
    "https://assets.untappd.com/profile/73a0f0324aaf8d7993f82fae1853fc88_100x100.jpg",
    "https://assets.untappd.com/profile/372ce377b3276101e1c732b513a8258f_100x100.jpg",
    "https://assets.untappd.com/profile/020bfe3de56e099358d81de4f802afd9_100x100.jpg",
    "https://assets.untappd.com/profile/90607b1dfd30005e838d3c9cd7a8ba38_100x100.jpg",
    "https://assets.untappd.com/profile/5bc5d673f6c123d6573f775bb26423ee_100x100.jpg",
    "https://assets.untappd.com/profile/059d5370d541eea08b3d71ecbbe2c89b_100x100.jpg",
    "https://assets.untappd.com/profile/473012ea4c24ca1224347b52dd46ddd1_100x100.jpg",
    "https://assets.untappd.com/profile/465782232198ac79e8c36f6cc6cba215_100x100.jpg",
    "https://assets.untappd.com/profile/fe2d063022d107e1ad0d8966d1f603d7_100x100.jpg",
    "https://assets.untappd.com/profile/999cea9b4367dba487d5aadb397f15d6_100x100.jpg",
    ]
    names = ['Karen','Phil','Diego','Elon','Rupert','Clifford','Jenna','Rebacca','Justine','Lily','Fiona','Alan','Charlie','Alex','Steve','Hilda','Xena','Jerry','Beth']
    last = ['Smith','Smithson','Levi','Snape','Dumbledore','Lee','McGregor','Kim','Putin','Thisseldorf','Strickland','Jones']
    i = 0
    while i < 9:
        skelly = User(
            first_name= names[randint(0,len(names)-1)],
            last_name= last[randint(0,len(last)-1)],
            email= f'{i}@gmail.com',
            password= 'password',
            age=25,
            profile_pic=pics.pop(),
            username= f'{i}user{randint(1,10)}'
        )



        db.session.add(skelly)
        i+=1

    demoUser = User(
            first_name= "John",
            last_name= "Doe",
            email="demo@gmail.com",
            password= 'password',
            age=33,
            username= 'Demo'
        )
    db.session.add(demoUser)
    db.session.commit()

#!!!!!!!!!! OLD USERS SEED#!!!!!!!!!! OLD USERS SEED
# Adds a demo user, you can add other users here if you want
# def seed_users():
#     demo = User(
#         username='Demo', email='demo@aa.io', password='password')
#     marnie = User(
#         username='marnie', email='marnie@aa.io', password='password')
#     bobbie = User(
#         username='bobbie', email='bobbie@aa.io', password='password')

#     db.session.add(demo)
#     db.session.add(marnie)
#     db.session.add(bobbie)
#     db.session.commit()
#!!!!!!!!!! OLD USERS SEED#!!!!!!!!!! OLD USERS SEED

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()