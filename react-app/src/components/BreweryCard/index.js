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
        brewery_logo, beers, description, owner, badges } = brewery

    // const handleClickBeer = (beerIDnum) => {
    //     dispatch(thunkOneBeer(beerIDnum))


    //     history.push(`/beer/${beerIDnum}`)
    // }
    // const handleClickBrewery = () => {
    //     dispatch(thunkOneBrewery(id))


    //     history.push(`users/${user?.id}/brewery`)
    // }

    // console.log(beer)
    return (
        <div>
            <div className="brewery-main-container">
                <div className="brewery-subcontainer">
                    <div className='brewery-logo-subcontainer'>
                        <div className='brewery-logo-info-container'>
                            <div className='logo-and-edit-button-container'>
                                <img
                                    className='brewery-card-logo'
                                    key={`beerlogo${id}`}
                                    src={`${brewery_logo}`}
                                    alt='previewimageforcard'
                                />
                                <div id='edit-button'>
                                    <OpenModalButton
                                        buttonText="Update Brewery"
                                        modalComponent={<BreweryEditModal brew={brewery} />}
                                    />
                                </div>{/*refers to containing handleClick and beerlogo id and info*/}
                            </div>
                            <div className="brewery-name-city-type-container">{/**starts Brewery info */}
                                <div>Name: {name}</div>
                                <div>City/State:{city_state}</div>
                                <div>Brewery Type: {brewery_type}</div>
                            </div>{/**Closes Brewery Info*/}
                        </div>
                        <div className="brewery-info-description">
                            <div>
                                Description:{description}
                            </div>

                        </div>
                    </div>

                    <div>
                        <h1 style={{ color: "green" }}>
                            {name}'s beers
                        </h1>
                        <div className='create-a-beer-button'>
                            <OpenModalButton
                                buttonText="Make a Beer"
                                //   onItemClick={closeMenu}
                                modalComponent={<BeerFormModal id={brewery?.id} />} />
                        </div>
                        <div>
                            {beers.map((x) =>
                                <div className='beer-box'>
                                    <BeerCard beer={x} user={user} />


                                    <div className="edit-delete-beer-on-brewery-button">
                                        <OpenModalButton
                                            buttonText="Edit/Delete"
                                            modalComponent={<BeerEditModal beer={x} />}
                                        />
                                    </div>

                                    <div id="create-badge-on-brewery-button">
                                        <OpenModalButton
                                            buttonText="Create a Badge"
                                            modalComponent={<BadgeFormModal id={x?.id} />}
                                        />
                                    </div>

                                </div>
                            )}

                        </div>


                    </div>{/*closes off the beers mapped and name city/state and brewery type info*/}
                </div >
            </div>
        </div >

    )

}
