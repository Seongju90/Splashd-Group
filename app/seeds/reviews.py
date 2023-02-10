
from app.models import db, User, Review, Beer,environment, SCHEMA
from random import randint


def seed_reviews():
    # getting all beers so we can loop through and add reviews to each
    all_beers = Beer.query.all()
    for beer in all_beers:
        # getting all the users, so that we can assign them as the reviewer
        all_users = User.query.all()
        # deciding how many reviews the single beer will get
        review_number = randint(1, 20)
        # to ensure we dont have repeated pictures and ratings in the reviews
        review_image_check = []
        rating_check = []
        # second loop to add multiple reviews to one beer
        i = 0
        while i < review_number:

            # images declared in the loop so that we dont have repeated pictures in the reviews for one beer
            # this is randomly selecting whether the review has an image
            if randint(1, 100) % 2 == 0:
                imagee = None
            else:
                images = [
                    "https://images.unsplash.com/photo-1436076863939-06870fe779c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZHJpbmtpbmclMjBiZWVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
                    "https://images.unsplash.com/photo-1605032936754-f03abc9df599?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZHJpbmtpbmclMjBiZWVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
                    "https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJpbmtpbmclMjBiZWVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
                    "https://images.unsplash.com/photo-1578707484207-cef507f0c378?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZHJpbmtpbmclMjBiZWVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
                    "https://images.unsplash.com/photo-1602677563842-977580b09aca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZHJpbmtpbmclMjBiZWVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
                    "https://images.unsplash.com/photo-1542634093-e0198d4d1e46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGRyaW5raW5nJTIwYmVlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60",
                    "https://images.unsplash.com/photo-1508341103935-e8d7aa7d4815?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRyaW5raW5nJTIwYmVlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60",
                    "https://images.unsplash.com/photo-1471421298428-1513ab720a8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGRyaW5raW5nJTIwYmVlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60",
                    "https://images.unsplash.com/photo-1600788886242-5c96aabe3757?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGRyaW5raW5nJTIwYmVlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60",
                    "https://images.unsplash.com/photo-1471421298428-1513ab720a8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGRyaW5raW5nJTIwYmVlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1593806812862-1dc510b769a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGRyaW5raW5nJTIwYmVlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1569937755861-22f34e3ce88f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGRyaW5raW5nJTIwYmVlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1496397604916-a3d9461942b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDh8fGRyaW5raW5nJTIwYmVlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/flagged/photo-1560873199-2769fae341b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTB8fGRyaW5raW5nJTIwYmVlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1601055566700-6ce8ffaaafa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTd8fGRyaW5raW5nJTIwYmVlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTh8fGRyaW5raW5nJTIwYmVlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1569937714388-d0ff8cbf687b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjJ8fGRyaW5raW5nJTIwYmVlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1591600352614-8d3f43a0a26b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjZ8fGRyaW5raW5nJTIwYmVlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1579880651719-3cef00eae7de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzB8fGRyaW5raW5nJTIwYmVlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1569937756447-1d44f657dc69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzd8fGRyaW5raW5nJTIwYmVlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                    "https://images.unsplash.com/photo-1616248379651-4edbe4c3ac2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTN8fGRyaW5raW5nJTIwYmVlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                ]
                # randomly picking an image to use
                image_id = randint(0, len(images)-1)

                #!!!!! TOOK AWAY THE LOOP FOR REPEATS DUE TO ERRORS!!!!!!!


                # a while check for ensuring images are unique
                # while image_id in review_image_check:
                #     image_id = randint(randint(0, len(images)-1))
                # appending to check to keep them unique
                review_image_check.append(image_id)
                imagee = images[image_id]

            # get a random person to review the beer (id only)
            a_user = all_users[randint(0, len(all_users)-1)].id

            # rating and review section goes here before creation
            reviews = [
                "The beer was a to bitter for me, but otherwise that was great.3",
                "Most amazing drink I've had in a while, highly recommended for beer lovers.5"
                "My friends loved it, but I was not a big fan of it, sorry!1"
                "Drink was awesome, but the music was too loud it ruined the mood.4"
                "Great drinks, great food, great friends, what more can I ask for?5"
                "Drinks were more catered to beer fanatics, not light-weight people like me, very disappointed.1"
                "For the amount of time I had to wait, the drinks were just so-so, I've had better elsewhere.2"
                "My beer was flat, it was supposed to be crafted, refund please.1"
                "Drink was great, would come again, but overpriced.4"
                "The best drink I've had compared to all the other breweries, keep up the good work!5"
                "I don't think I wille ever come back to drink from here ever again, worst experience in my life.1"
                "Friends, family, strangers this place is heaven for beer fanatics.5"
                "When you thought beer can't get any better, this beer has proven me wrong.5"
                "Place was packed and loud, drinks were so-so, I will give it another try on a slow day.3"
                "If I can give you a penny for every drink I had here, you would be a billionare.5"
                "I feel like the drinks can be better, but at the moment its not up to par.2"
                "Beer was great, but the bartender was so rude.2"
                "I will never come back here again, after that horrible service, no matter how great the drinks are!1"
                "I will love to bring my friends back here again for my birthday because we are a group of beer lovers.5"
                "I wish they served a variety of beers for casual drinks also, otherwise it was great.4"
                "Will you ever make a second location near me? I would love to come everyday for the drinks, but its too FAR!5"
                "The best possible drink with the best possible food, I love life.5"
                "Please tell me that this drink is a joke, because it taste horrible.1"
                "Took my parents here for their 70th birthday because they were beer lovers, didn't regret it at all!5"
                "Beer tastes great, would love to take some home with me.4"
            ]
            review_id = randint(0, len(reviews)-1)
            # a while check for ensuring review text is unique
            # while review_id in rating_check:
            #     review_id = randint(0, len(reviews)-1)
            #!!!!! TOOK AWAY THE LOOP FOR REPEATS DUE TO ERRORS!!!!!!!

            rating_check.append(review_id)

            # taking the last char in string as the rating and convert to integer
            ratingval = int(reviews[review_id][-1])
            # using all of string besides the last character for the body of review
            reviewbody = reviews[review_id]
            body = reviewbody[:-1]

            # add in the newly randomized review
            new_review = Review(
                beer_id=beer.id,
                user_id=a_user,
                image=imagee,
                review_text=body,
                rating=ratingval,
            )
            db.session.add(new_review)
            db.session.commit()
            i += 1


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    # db.session.execute('DELETE FROM reviews')
    # db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
