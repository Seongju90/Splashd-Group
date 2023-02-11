from app.models import Badge, Beer, Brewery, db,environment, SCHEMA
import random


badge_images = [
"https://assets.untappd.com/badges/bdg_untappdAtHome_lg.jpg","https://assets.untappd.com/badges/bdg_beers-of-the-world_lg.jpg","https://assets.untappd.com/badges/bdg_hoptopia_lg.jpg",
"https://assets.untappd.com/badges/bdg_HoppedDown_lg.jpg","https://assets.untappd.com/badges/bdg_brewery_prioneer_lg.jpg","https://assets.untappd.com/badges/bdg_connoiseur_lg.jpg",
"https://assets.untappd.com/badges/bdg_finnished_lg.jpg","https://assets.untappd.com/badges/bdg_playingTheField_lg.jpg","https://assets.untappd.com/badges/bdg_barCrawl_lg.jpg",
"https://assets.untappd.com/badges/bdg_middle-of-the-road_lg.jpg","https://assets.untappd.com/badges/bdg_YIB-22-CANARCHY-Badge_CCB_lg.png","https://assets.untappd.com/badges/bdg_BAIndySeal18_lg.jpg",
"https://assets.untappd.com/badges/bdg_tasteCrazy_lg.jpg","https://assets.untappd.com/badges/bdg_WheelofStyles_lg.jpg","https://assets.untappd.com/badges/bdg_beerGathering_lg.jpg",
"https://assets.untappd.com/badges/bdg_YearinBeer2022_lg.jpg","https://assets.untappd.com/badges/bdg_newbie_lg.jpg","https://assets.untappd.com/badges/bdg_RidingSteady_lg.jpg",
"https://assets.untappd.com/badges/bdg_GloryCan_lg.jpg","https://assets.untappd.com/badges/bdg_america_lg.jpg","https://assets.untappd.com/badges/bdg_neipa_lg.jpg",
"https://assets.untappd.com/badges/bdg_brewery_prioneer_lg.jpg","https://assets.untappd.com/badges/bdg_SpaceDust2023_lg.jpg","https://assets.untappd.com/badges/bdg_beertography_lg.jpg",
"https://assets.untappd.com/badges/bdg_ToGoPlease_2020_lg.jpg","https://assets.untappd.com/badges/bdg_YIB-22-CANARCHY-Badge_JIPA_lg.png","https://assets.untappd.com/badges/bdg_YIB-22-CANARCHY-Badge_CCB_lg.png",
"https://assets.untappd.com/badges/bdg_PaleMoon_lg.jpg","https://assets.untappd.com/badges/bdg_SourBrew_lg.jpg","https://assets.untappd.com/badges/bdg_VerifiedVenue_lg.jpg",
"https://assets.untappd.com/badges/bdg_FruitsOfYourLabor_lg.jpg","https://assets.untappd.com/badges/bdg_saison_lg.jpg","https://assets.untappd.com/badges/bdg_99Bottles_lg.jpg",
"https://assets.untappd.com/badges/bdg_legendary_lg.jpg","https://assets.untappd.com/badges/bdg_shadow_of_a_stout_lg.jpg","https://assets.untappd.com/badges/bdg_bdayBrew_lg.jpg",
"https://assets.untappd.com/badges/bdg_hhh_lg.jpg","https://assets.untappd.com/badges/bdg_2xCore_lg.jpg","https://assets.untappd.com/badges/bdg_pilsner_lg.jpg",
"https://assets.untappd.com/badges/bdg_findSource_lg.jpg","https://assets.untappd.com/badges/bdg_BravoForBrown_lg.jpg","https://assets.untappd.com/badges/bdg_wonderland_lg.jpg",
]

def seed_badges():
    all_beers = Beer.query.all()
    

    for beer in all_beers:
        new_badge=Badge(
            beer_id=beer.id,
            brewery_id=beer.brewery_id,
            icon=random.choice(badge_images),
            description= f'Check-in a {beer.name} from {beer.beer_brewery.name}'
        )
        db.session.add(new_badge)
        db.session.commit()




def undo_badges():
    # db.session.execute('TRUNCATE badges RESTART IDENTITY CASCADE;')
    # db.session.execute('DELETE FROM badges')
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.badges RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM badges")

    db.session.commit()
