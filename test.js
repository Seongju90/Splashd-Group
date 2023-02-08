store =
{
    session: {mydrink:[], mybades:[], mybreweries:[]},
    drinks: {1:{},2:{}}

    drinks: { one: {id:2,type: ByteLengthQueuingStrategy, color: red}, all: [{id:1,type: ByteLengthQueuingStrategy, color: red}, {},...list] },
    reviewOfDrinks: { singleDrinkReviews: {}, allReviews: [...list of review for drinks] },
    brewery: { byId: {} },
    badges: { byId: {}, allBadges: [...list of all badges] },
}