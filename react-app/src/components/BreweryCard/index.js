import { useHistory } from 'react-router-dom';
import { thunkOneBeer } from '../../store/beer';
import { useDispatch } from 'react-redux';
import BeerCard from '../BeerCard'
import { thunkOneBrewery } from '../../store/brewery';
import '../../zCSS/brewerycard.css'

export default function BreweryCard({ brewery, user }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const { id, name, owner_id, city_state, brewery_type,
        brewery_logo, beers, owner, badges } = brewery

    const handleClickBeer = (beerIDnum) => {
        dispatch(thunkOneBeer(beerIDnum))


        history.push(`/beer/${beerIDnum}`)
    }
    const handleClickBrewery = () => {
        dispatch(thunkOneBrewery(id))


        history.push(`/brewery/${id}`)
    }
    // console.log(beer)
    return (
        <div>
            <div className="brewery-main-container">
                <div className="brewery-logo-container">



                    <div className='brewery-card-click'
                        onClick={handleClickBrewery}
                    >
                        <img
                            className='brewery-card-click'
                            key={`beerlogo${id}`}
                            src={`${brewery_logo}`}
                            alt='previewimageforcard'
                        />

                    </div>{/*refers to containing handleClick and beerlogo id and info*/}


                    
                        <div className="brewery-info-container">{/**starts Brewery info */}

                            <div>Name: {name}</div>

                            <div>City/State:{city_state}</div>
                            <div>Brewery Type: {brewery_type}</div>
                        </div>{/**Closes Brewery Info*/}
                        <div>
                            <h1>
                                {name}'s beers
                            </h1>
                            <div>
                                {beers.map((x) =>
                                    <div className='beer-box'>
                                        <BeerCard beer={x} user={user} />
                                        <div id='edit-button'
                                            onClick={() => handleClickBeer(x.id)}
                                        >
                                            Edit Your Beer or Create adge at Page
                                        </div>


                                    </div>
                                )}

                            </div>
                        

                    </div>{/*closes off the beers mapped and name city/state and brewery type info*/}
                </div >
            </div>
        </div>

    )

}
