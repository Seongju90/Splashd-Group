import { useHistory } from 'react-router-dom';
import { thunkOneBeer } from '../../store/beer';
import { useDispatch } from 'react-redux';
import { BeerCard } from '../BeerCard'
import { thunkOneBrewery } from '../../store/brewery';
import '../../zCSS/brewerycard.css'

export default function BreweryCard({ brewery, user }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const { id, name, owner_id, city_state, brewery_type,
        brewery_logo, beers, owner, badges} = brewery

    const handleClickBeer = (beerIDnum) => {
        dispatch(thunkOneBeer(beerIDnum))


        history.push(`/beer/${beerIDnum}`)
    }
    const handleClickBrewery = () => {
        dispatch(thunkOneBrewery(id))


        history.push(`/brewery/${id}`)
    }
    // console.log(beer)
    return  (
        <div>
            <div className="brewery-main-container">
                <div className="brewery-logo-container">


            <div>
                    <div 
                    onClick={handleClickBrewery}
                    >
                    <img key={`beerlogo${id}`}
                        src={`${brewery_logo}`}
                        alt='previewimageforcard'
                        />

                    </div>{/*refers to containing handleClick and beerlogo id and info*/}
                    </div>

                    <div >{/* */}
                    <div className="brewery-info-container">{/**starts Brewery info */}

                    <div>Name: {name}</div>

                    <div>City/State:{city_state}</div>
                    <div>Brewery Type: {brewery_type}</div>
                        </div>{/**Closes Brewery Info*/}


                {beers.map((x) =>
                    <>
                        <h1>
                            BEER ID: {x.id} NAME: {x.name}

                        </h1>
                        <div
                                onClick={() => handleClickBeer(x.id)}
                                >
                                {/* <img key={`beerlogo${x.id}`}
                                    src={`${x.beer_logo}`}
                                    alt='previewimageforcard'
                                /> */}

                        </div>

                    </>
                )}


                </div>{/*closes off the beers mapped and name city/state and brewery type info*/}
                </div >
            </div>
        </div>

    )

}
