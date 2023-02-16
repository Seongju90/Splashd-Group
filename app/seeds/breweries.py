from app.models import db, Brewery, User, environment, SCHEMA
from random import randint


def seed_breweries():
    brewery_name = [
        ["Stone Brewing", "https://assets.untappd.com/site/brewery_logos/brewery-1204_a1e0b.jpeg"],
        ["Founders Brewing Co",
            "https://assets.untappd.com/site/brewery_logos/brewery-549_53a84.jpeg"],
        ["Goose Island Beer Co.",
            "https://assets.untappd.com/site/brewery_logos/brewery-2898_7588b.jpeg"],
        ["Dogfish Head Craft Brewery",
            "https://assets.untappd.com/site/brewery_logos/brewery-459_75746.jpeg"],
        ["Bell's Brewery", "https://assets.untappd.com/site/brewery_logos/brewery-2507_ad044.jpeg"],
        ["Tree House Brewery Company",
            "https://assets.untappd.com/site/brewery_logos/brewery-treehousebrewingcompany_20084.jpeg"],
        ["Other Half Brewing Co",
            "https://assets.untappd.com/site/brewery_logos/brewery-94785_13f7c.jpeg"],
        ["Ballast Point Breweing Company",
            "https://assets.untappd.com/site/brewery_logos/brewery-68_a41ff.jpeg"],
        ["Deschutes Brewery",
            "https://assets.untappd.com/site/brewery_logos/brewery-441_51ca4.jpeg"],
        ["Boulevard Brewing Co.",
            "https://assets.untappd.com/site/brewery_logos/brewery-1514_2003e.jpeg"],
        ["Victory Brewing Company",
            "https://assets.untappd.com/site/brewery_logos/brewery-1326_4578e.jpeg"],
        ["Trillium Brewing Company",
            "https://assets.untappd.com/site/brewery_logos/brewery-23038_927b0.jpeg"],
        ["Brooklyn Brewery", "https://assets.untappd.com/site/brewery_logos/brewery-BrooklynBrewery_259.jpeg"],
        ["Oskar Blues Brewery",
            "https://assets.untappd.com/site/brewery_logos/brewery-956_9066d.jpeg"],
        ["Evil Twin Brewing",
            "https://assets.untappd.com/site/brewery_logos/brewery-3735_539d4.jpeg"],
        ["Rogue Ales", "https://assets.untappd.com/site/brewery_logos/brewery-4565_31f59.jpeg"],
        ["Cigar City Brewing",
            "https://assets.untappd.com/site/brewery_logos/brewery-379_8867c.jpeg"],
        ["Prairie Artisan Ales",
            "https://assets.untappd.com/site/brewery_logos/brewery-prairieartisanales_37713.jpeg"],
        ["Tröegs Independent Brewing",
            "https://assets.untappd.com/site/brewery_logos/brewery-2583_46be7.jpeg"],
        ["Avery Brewing Co.",
            "https://assets.untappd.com/site/brewery_logos/brewery-62_00c58.jpeg"],
        ["Flying Dog Brewery",
            "https://assets.untappd.com/site/brewery_logos/brewery-540_27433.jpeg"],
        ["Left Hand Brewing Company",
            "https://assets.untappd.com/site/brewery_logos/brewery-779_97419.jpeg"],
        ["Brewery Ommegang",
            "https://assets.untappd.com/site/brewery_logos/brewery-249_909c0.jpeg"],
        ["Wicked Weed Brewing",
            "https://assets.untappd.com/site/brewery_logos/brewery-37851_0a148.jpeg"],
        ["Revolution Brewing Company",
            "https://assets.untappd.com/site/brewery_logos/brewery-2605_1fa9b.jpeg"],
        ["New Holland Brewing",
            "https://assets.untappd.com/site/brewery_logos/brewery-908_b4462.jpeg"],
        ["Great Divide Brewing Company",
            "https://assets.untappd.com/site/brewery_logos/brewery-604_427db.jpeg"],
        ["Green Flash Brewing Company",
            "https://assets.untappd.com/site/brewery_logos/brewery-609_ba97b.jpeg"],
        ["Brouwerij Van Steenberge",
            "https://assets.untappd.com/site/brewery_logos/brewery-7778_ec704.jpeg"],
        ["Northern Monk", "https://assets.untappd.com/site/brewery_logos/brewery-71828_20573.jpeg"],
        ["Breckenridge Brewery",
            "https://assets.untappd.com/site/brewery_logos/brewery-236_64a60.jpeg"],
        ["Equilibrium Brewery",
            "https://assets.untappd.com/site/brewery_logos/brewery-198789_9cb30.jpeg"],
        ["Harpoon Brewery",
            "https://assets.untappd.com/site/brewery_logos/brewery-634_c50a6.jpeg"],
        ["Spoetzl Brewery",
            "https://assets.untappd.com/site/brewery_logos/brewery-1179_b8234.jpeg"],
        ["Sixpoint Brewery", "https://assets.untappd.com/site/brewery_logos/brewery-SixpointBrewery_1149.jpeg"],
        ["Delirium-Huyghe Brewery",
            "https://assets.untappd.com/site/brewery_logos/brewery-285_94cce.jpeg"],
        ["21st Amendment Brewery",
            "https://assets.untappd.com/site/brewery_logos/brewery-4339_340df.jpeg"],
        ["Russian River Brewing Company",
            "https://assets.untappd.com/site/brewery_logos/brewery-5143_e6069.jpeg"],
        ["Pipeworks Brewing Company",
            "https://assets.untappd.com/site/brewery_logos/brewery-4012_8aa80.jpeg"],
        ["Hill Farmstead Brewery",
            "https://assets.untappd.com/site/brewery_logos/brewery-2562_e7536.jpeg"],

        ["Short's Brewing Company",
            "https://assets.untappd.com/site/brewery_logos/brewery-1139_52f61.jpeg"],

        ["North Coast Brewing Company",
            "https://assets.untappd.com/site/brewery_logos/brewery-NorthCoastBrewingCompany_919_d2110.jpeg"],
    ]

    brewery_city_state = [
        "Escondido, CA", "Grand Rapids, MI", "Chicago, IL", "Milton, GA", "Comstock, MI", "Bend, OR", "San Diego, CA", "Brooklyn, NY", "Charlton, MA", "Kansas City, KS", "Downingtown, PA", "Canton, OH", "Longmont, CO",
        "Newport, RI", "Krebs, OK", "Hershey, PA", "Boulder, NV", "Los Angeles, CA", "Houston, TX", "Phoenix, AZ", "Philadelphia, PA", "San Antonio, TX", "Dallas, TX", "San Jose, CA", "Austin, TX", "Jacksonville, FL",
        "Fort Worth, TX", "Columbus, OH", "Indianapolis, IN", "San Francisco, CA", "Seattle, WA", "Denver, CO", "Nashville, TN", "Washington, DC", "Boston", "El Paso, TX", "Portland, OR", "Las Vegas, CA", "Memphis, TN",
        "Detroit, MI", "Baltimore, MD", "Milwaukee, WI", "Albuquerque, NM", "Fresno, CA", "Tucson, AZ", "Sacramento, CA", "Long Beach, CA", "Raleigh, NC", "Omaha, NB", "Cleveland, OH", "New Orleans, NO", "Irvine, CA",
        "Orlando, FL", "Santa Ana, CA", "Cincinnati, OH", "Riverside, CA", "Buffalo, NY", "Anchorage, AL", "Lubbock, TX", "Garland, TX", "Norfolk, VA", "Huntsville, AL", "Yonkers, NY", "Sunrise Manor, NV", "Cape Coral, FL",
    ]

    brewery_type = [
        "Regional Brewery",
        "Macro Brewery",
        "Home-brewery",
        "International Brewery"
    ]
    description = [
    "A significant portion of Europe's oldest alcoholic beverage companies were first the in-house brand of a small pub, as they began to offer specialized beverages.",
    "The brewer sells to a wholesaler who sells to a retailer who sells to the consumer.",
    "A brewpub is a hybrid between a restaurant and a brewery.",
    "A taproom brewery is similar to a brewpub in that it sells 25% or more of its beer on-site.",
    "The most basic identifier to know when it comes to breweries is whether or not they are independent.",
    " There have been a few changes to the benchmark of what defines small breweries vs. large breweries, which altered the definition of what it means to be independent",
    "As of 2019, more than 4,000 craft brewers are using the seal to differentiate themselves and highlight their quality.",
    "This group represents more than 85% of the volume of craft beer produced in the United States.",
    "Breweries of this scale produce far smaller amounts of beer as compared to their large-scale corporate counterparts. ",
    "The most pervasive one is likely that craft beers are all powerfully distinct and possibly overwhelming in flavor.",
    "Many people believe you can always distinguish a craft beer from one produced by a macrobrewery, with the latter having a weaker and more bland flavor.",
    "You may have noticed that mass-produced beers are often the same shade of watery yellow.",
    "The specific gravity of wort (unfermented beer) before fermentation. A measure of the total amount of solids that are dissolved in the wort",
    "The specific gravity of a beer as measured when fermentation is complete (when all desired fermentable sugars",
    "A measurement of the alcohol content in terms of the percentage volume of alcohol",
    "Our Portland brewery consists of a 15 barrel brew house, six 30 barrel fermenters, two 15 barrel fermenters",
    "Our Kittery brewery is used to brew experimental and small batch beer on our pilot system",
    "Outside of Maine we have regular distribution in New Hampshire through Vacationland Distributors.",
    "The varying aspects of the brewing process and brewer's personal touches and intent add the final notes that make each craft beer unique.",
    "At Tavern we have broken out 7 major flavor profiles of craft beer.",
    " Over the past 25 years, we've carried this same spirit in the way we brew our beer - shaking up classic styles",
    "We opened our doors in 1996 when bold art and music defined Seattle.",
    "Come chase down the rabbit hole with us."

]
    allusers = User.query.all()
    # looping
    for b in brewery_name:
        new_addition = Brewery(
            # name is the first item in loop
            name=b[0],
            # owner is a random number in the allusers, key into their id
            owner_id=allusers[randint(0, len(allusers)-1)].id,
            # randomly select the location
            city_state=brewery_city_state[randint(0, len(brewery_city_state)-1)],
            # type is randomly selected
            brewery_type=brewery_type[randint(0, len(brewery_type)-1)],
            # logo is the second half of the loop variable
            description=description[randint(0, len(description)-1)],

            brewery_logo=b[1]
        )
        # need to add and commit in the loop
        db.session.add(new_addition)
        db.session.commit()


def undo_breweries():
    # if environment == "production":
    #     db.session.execute(
    #         f"TRUNCATE table {SCHEMA}.brewerys RESTART IDENTITY CASCADE;")
    # else:
        # db.session.execute('TRUNCATE breweries RESTART IDENTITY CASCADE;')
        # db.session.execute('DELETE FROM breweries')
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.breweries RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM breweries")
        db.session.commit()
