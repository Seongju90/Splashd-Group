import { useHistory } from 'react-router-dom';
import { thunkOneBeer } from '../../store/beer';
import { useDispatch } from 'react-redux';
import BeerCard from '../BeerCard'
import { thunkOneBrewery, thunkEditBrewery } from '../../store/brewery';
import '../../zCSS/brewerycard.css'
import BreweryEditModal from '../BreweryEditModal';
import OpenModalButton from '../OpenModalButton';
import BeerEditModal from '../BeerEditModal'
import BeerFormModal from '../BeerFormModal'
import BadgeFormModal from '../BadgeFormModal';

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


        history.push(`users/${user?.id}/brewery`)
    }

    // console.log(beer)
    return (
        <div>
            <div className="brewery-main-container">
                <div className="brewery-logo-container">


                    <div>

                        <div className='brewery-card-click'
                            onClick={handleClickBrewery}
                        >
                            <img
                                className='brewery-card-click'
                                key={`beerlogo${id}`}
                                src={`${brewery_logo}`}
                                alt='previewimageforcard'
                            />
                        </div>
                        <div id='edit-button'>


                            <OpenModalButton
                                buttonText="Edit/Delete"
                                modalComponent={<BreweryEditModal brew={brewery} />}
                            />
                        </div>{/*refers to containing handleClick and beerlogo id and info*/}
                    </div>



                    <div className="brewery-info-container">{/**starts Brewery info */}

                        <div>Name: {name}</div>

                        <div>City/State:{city_state}</div>
                        <div>Brewery Type: {brewery_type}</div>
                        <div> Average Rating coming Soon!</div>
                    </div>{/**Closes Brewery Info*/}
                    <div>
                        <h1>
                            {name}'s beers
                        </h1>
                        <OpenModalButton
                            buttonText="Make a Beer"
                            //   onItemClick={closeMenu}
                            modalComponent={<BeerFormModal id={brewery?.id} />} />
                        <div>
                            {beers.map((x) =>
                                <div className='beer-box'>
                                    <BeerCard beer={x} user={user} />

                                    <OpenModalButton
                                        buttonText="Edit/Delete"
                                        modalComponent={<BeerEditModal beer={x} />}
                                    />
                                    <OpenModalButton
                                        buttonText="Create a Badge"
                                        modalComponent={<BadgeFormModal id={x?.id} />}
                                    />
                                </div>
                            )}

                        </div>


                    </div>{/*closes off the beers mapped and name city/state and brewery type info*/}
                </div >
            </div>
        </div >

    )

}
