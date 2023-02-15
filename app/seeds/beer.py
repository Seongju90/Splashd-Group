from app.models import db, Beer, Brewery, environment, SCHEMA
# from random import randint, uniform
# from random import uniform
import random

# if we have time later we will make more seeds
all_beers = [
    "Fonteinen Hommage", "Degrees Brewing", "Est Lager", "Paddles Brewing Home Sweet Home", "Abbot Ale", "Ace Hill", "Admnams Ghost", "Alexander Keiths",
    "Extreme", "Abandoned At The Altar", "Aecht Schlenkeria", "All Or Nothing", "All Out Effort", "Tropical Double", "Allsopps", "Amber of the North",
    "Amsterdam Speed", "Amsterdam Boneshaker", "Amsterdam Fracture Juicy", "Amsterdam Natural", "Amsterdam Space Invader", "Anderson Craft", "Anderson Gold",
    "Angry Orchard", "Ardiel Cider House", "Aria Lager", "Arizona Hard", "Another", "Aria", "Asahi", "Averbode Abby", "Ashton Brewing", "Avling Brewing",
    "Bancroft Brewing", "Bangarang", "Bavaria", "Bayside", "Beach Chair", "Beach Day Every Day", "Beaches Brewing", "Bear Runner", "Bearded Prospetor", "Beaus Full Time",
    "Beaus Lug", "Nordic", "Becks", "Beer Nerds", "Beer Squad Holiday", "Bellhaven", "Bell City", "Eureka", "Too Wound Down", "Bellwoods", "Bench Brewing",
    "Benediktiner Hell", "Beyond The Pale", "Bicycle Craft", "Big Drop Paradiso", "Big Rig", "Bighead", "Bilboquet Series", "Blonde", "Birra Castello", "Birra Moretti",
    "Bitburger", "Black Bellows White", "Black Ice", "Black Label", "Black Oak", "Black Rapids", "Blacklist", "Blackburn Brewhouse", "Blanche De Chambly", "Block Three Brewing",
    "Blood Brothers", "Blue Moon", "Blyth", "Bobcaygeon", "Bombardier", "Bombshell", "Boris", "Boshkung", "Boxer", "Brasserie Tuque", "Brava", "Bourgogne", "Brauwerk North",
    "Brewlime", "Brewaid", "Brickworks", "Bring Your Own", "Broadhead", "Bud Light", "Budweiser", "Burdock", "Busl", "Busch", "Buzz", "Calobogie", "Caledon Hills", "Camerons Jurassic",
    "Canuck", "Capt", "Carling", "Carlsberg", "Cassel", "Cascade", "Cerveza Revolucion", "Carib", "Caribbean", "Chill Street", "Chimay", "Chronicle", "Church Key", "Class V", "Clear Lake",
    "Cigar", "Clausthaler", "Clavie Smoked", "Cliff Top", "Clifford", "Coffin", "Cold Break", "Collective Arts", "Collingwood", "Colt", "Coors", "Corona", "Coronita", "Cottage Springs",
    "County Pear", "Covered Bridge", "Cowbell", "Crank", "Creemore", "Crest", "Crystal", "Czechvar", "Cup and Saucer", "Donte Poke The Bear", "Dab", "Daft", "Dark Streets of London",
    "Daura", "Deadline", "Decouverte", "Deadline", "Divercity Helles", "Devils", "Dominion City", "Dos Equis", "Double Trouble", "Dragon", "Driftwood", "Duchesse", "Duntroon", "Eagle Banana",
    "Eden Grove", "Elora", "El Gringo", "Ebb and Flow", "English", "Equals", "Erdinger", "Ernest", "Estrella", "Exchange", "Expedition", "Farm League", "Farmers Daughter", "Faxe", "Fenelon",
    "Feels Like Friday", "Fat Tire", "Fix Hellas", "Fixed Gear", "Flying Monkeys", "Follow Your Nose", "Forbidden", "Forked River", "Four Fathers", "Frank", "Full Beard", "Fresh Ideas",
    "Furnace", "Fullers", "Gaffel Kolsch", "Gateway City", "Gahan", "Georgian Bay Dipper", "Get the Puck Out", "Glutenberg", "Goodlot", "Goose Island", "Grand River", "Granville",
    "Great Lakes", "Grenadier", "Griffon", "Growers", "Guiness", "Hacker Pschorr", "Haliburton", "Harushika" "Harp", "Havens", "Heineken", "Henderson", "Hollandia", "Holsten", "Hometown",
    "Imperial City", "Iron Pig", "Jackass", "James Ready", "Johnny Bootlegger", "Kensington", "Kichesippi", "Kilkenny", "Kingsville", "Kirin Ichiban", "Kona", "La Trappe", "Lake of Bays",
    "Left Field", "Les Trois", "Libra", "Lock Street", "Lomza", "London", "Longslice", "Louis Cifer", "Lowenbrau", "Mackinnon", "Mackeson", "MacLean", "Manitoulin", "Market Brewing",
    "Manitoulin", "Manzairaku", "Martens", "Matron", "Mickeys", "Michelob Ultra", "Mill Street", "Miller", "Modelo", "Molson", "Mongozo", "Moosehead", "Muskoka", "Naughty Otter", "Neustadt",
    "Newark", "New Belgium", "New Belgium Voodoo Ranger", "Niagara Oast", "Nickel Brook", "No Boats On Sunday", "Okanagan", "Old Comrade", "Pabst Blue Ribbon", "Palm Bay Rainbow",
    "Paniza", "Paulaner", "Passion Project", "PC", "Peroni", "Perth", "Phillips", "Pommies", "Poppers", "Powerhouse", "Prince Eddys", "Redline", "Rainhard", "Reinhart", "Riverhead", "Rorschach",
    "Tangerine", "Sapporo", "Sawdust", "Samuel Adams", "Seventh Heaven", "Shiny Apple Cider"
]

# all_beers = [
#     "Fonteinen Hommage", "Degrees Brewing", "Est Lager", "Paddles Brewing Home Sweet Home", "Abbot Ale", "Ace Hill", "Admnams Ghost", "Alexander Keiths",
#     "Extreme", "Abandoned At The Altar", "Aecht Schlenkeria", "All Or Nothing", "All Out Effort", "Tropical Double", "Allsopps", "Amber of the North",
#     "Amsterdam Speed", "Amsterdam Boneshaker", "Amsterdam Fracture Juicy", "Amsterdam Natural", "Amsterdam Space Invader", "Anderson Craft", "Anderson Gold",
#     "Angry Orchard", "Ardiel Cider House", "Aria Lager", "Arizona Hard", "Another", "Aria", "Asahi", "Averbode Abby", "Ashton Brewing", "Avling Brewing",
# ]

beers_type = [
    "American Amber Ale", "American Amber Lager", "American Barley Wine", "American Black Ale", "American Brett", "American Brown Ale", "American Cream Ale", "American Imperial Porter", "American Imperial Red Ale",
    "American Imperial Stout", "American IPA", "American Lager", "American Pale Ale", "American Sour", "American Stout", "American-Style Wheat Wine Ale", "Baltic-Style Porter", "Barrel-Aged Beer", "Belgian-Style Blonde Ale",
    "Belgian-Style Dubbel"
]

beers_description = [
    "This beer is the real McCoy. Barrel aged and crammed with coffee, none other will stand in its way. Sought out for being delicious, it is notoriously difficult to track down. If you can find one, shoot to wanted... dead or alive.",
    "Intense aromatics of espresso and maple syrup lead into bourbon drenched maple candy and chocolate brownies on the palate. The culmination of everything one would want on a chilly morning.",
    "The color is derived from the use of caramel and crystal malt additions, which are roasted to provide amber beers with the color, body and flavor many beer fans have come to appreciate.",
    "Beer showcases a medium-high to high malt character with medium to low caramel character derived from the use of roasted crystal malts.",
    "Ale is a highly versatile companion to American cuisine, particularly foods that are grilled or barbecued, as roasted malts complement seared, charred and caramelized proteins making this ale beer type a perennial favorite at backyard cookouts.",
    "A widely available, sessionable craft beer style that showcases both malt and hops.",
    "Hop bitterness can range from very low to medium-high.",
    "Barley wine ranges from amber to deep red/copper-garnet in color.",
    "A caramel and/or toffee aroma and flavor are often part of the malt character along with high residual malty sweetness.",
    "Low levels of age-induced oxidation can harmonize with other flavors and enhance the overall experience. Sometimes sold as vintage releases.",
    "This has been the most-entered category at the Great American Beer Festival for more than a decade, and is the top-selling craft beer style in supermarkets and liquor stores across the U.S.",
    "Made with at least 50 percent wheat malt, this full-bodied beer features bready and candy flavors, and finishes with a great deal of malty sweetness.",
    " These beers may be oak-aged and sometimes have small amounts of darker malts added.",
    "Characterized by floral, fruity, citrus-like, piney, resinous American hops, the American pale ale is a medium-bodied beer with low to medium caramel, and carries with it a toasted maltiness.",
    "This is one of the most food-friendly styles to enjoy, since the pale ale works wonderfully with lighter fare such as salads and chicken, but can still stand up to a hearty bowl of chili; a variety of different cheeses, and even desserts.",
    "The ales affinity to food can be attributed to the simplicity of its ingredients, which include toasty pale malt, a clean fermenting ale beer yeast, and the counterbalance of American hops to help tease out preparing you for another bite.",
    "Because of its alcoholic strength, it may include very low to low complex alcohol flavors and/or lager fruitiness such as berries, grapes and plums (but not banana; ale-like fruitiness from warm-temperature fermentation is not appropriate)",
    "The ale is typically easy-drinking, with a low but pleasing hop bitterness."
    "This is a light- to medium-bodied ale, with a low malt aroma that has a spiced and sometimes fruity-ester character. Sugar is sometimes added to lighten the perceived body.",
    "This style is medium in sweetness and not as bitter as Belgian-style tripels or golden strong ales. It is usually brilliantly clear. The overall impression is balance between light sweetness, spice and low to medium fruity ester flavors.",

]

beers_logo = [
    'https://assets.untappd.com/site/beer_logos/beer-545798_895b6_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-1094326_82463_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-457032_3e3a6_sm.jpeg',
    'https://untappd.com/b/tree-house-brewing-company-eureka-w-nelson/1209870',
    'https://untappd.com/b/hill-farmstead-brewery-walden/201745',
    'https://assets.untappd.com/site/beer_logos/beer-1157584_fd186_sm.jpeg',
    'https://assets.untappd.com/site/assets/images/temp/badge-beer-default.png',
    'https://assets.untappd.com/site/beer_logos/beer-3147575_247c5_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-3455194_c20ae_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-3272790_a4bdf_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-293450_cf94b_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-1876134_1dff3_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-4677594_9b348_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-816781_88f95_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-3958821_a1f05_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-4478740_8764c_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-4329467_7c197_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-4130044_ddd9e_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-1897220_cda6e_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-4667158_1ae25_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-7747_34841_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-5519_45b43_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-128341_9b8e3_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-1458464_241ef_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-860861_3dca8_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-334024_7f8da_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-176609_73e02_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-494653_05eb8_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-austinBeerworksPearlSnap.jpg',
    'https://assets.untappd.com/site/beer_logos/beer-1712766_b340c_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-183964_8b455_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-17961_54090_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-36416_f2928_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-1113317_194ef_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-2679539_918ac_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-1712765_ef61f_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-3155602_ebc8a_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-1204180_9f3c5_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-2490071_55d1a_sm.jpeg',
    'https://assets.untappd.com/site/beer_logos/beer-1622046_e1777_sm.jpeg',
]

# test = ['hello', 'world', 'bye', 'planet']
def seed_beers():
    #DEXTERS CHANGES START HERE
    all_brew = Brewery.query.all()

    for brew in all_brew:
        # beer_num = random.randint(6,len(all_beers)-1)/3
        beer_num = 3

        #finding the number of logos to add to each beer, set a range so that
        #the random integer won't go past the number of logos that we have
        while beer_num>0:
            random_logo = beers_logo[random.randint(0, len(beers_logo)-1)]
            # query for all the breweries
            # all_brewery = Brewery.query.all()
            #find a random brewery to attach to the beer, chain .name just to get the id
            # random_brewery = all_brewery[random.randint(0, len(all_brewery)-1)].id
            beer = all_beers[random.randint(0, len(all_beers)-1)]
            #find a random beer type to attach to the beer
            random_type = beers_type[random.randint(0, len(beers_type)-1)]
            #find a random description type to attach to the beer
            random_description = beers_description[random.randint(0, len(beers_description)-1)]
            #find random ABV and IBU
            random_abv = round(random.uniform(0.3, 13.3), 2)
            random_ibu = random.randint(5,100)

            new_beer = Beer(
                name = beer,
                abv = random_abv,
                ibu = random_ibu,
                brewery_id = brew.id,
                type = random_type,
                description = random_description,
                beer_logo = random_logo
            )


            db.session.add(new_beer)
            db.session.commit()
            beer_num -= 1



def undo_beers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.beers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM beers")

    db.session.commit()
