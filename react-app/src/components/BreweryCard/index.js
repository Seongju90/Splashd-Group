import { useDispatch } from 'react-redux';
import BeerCard from '../BeerCard'
import { thunkDeleteBadge } from '../../store/badge';
import { thunkMyBrewery } from '../../store/brewery';
import '../../zCSS/brewerycard.css'
import BreweryEditModal from '../BreweryEditModal';
import OpenModalButton from '../OpenModalButton';
import BeerEditModal from '../BeerEditModal'
import BeerFormModal from '../BeerFormModal'
import BadgeFormModal from '../BadgeFormModal';


export default function BreweryCard({ brewery, user }) {
    const dispatch = useDispatch()
    const { id, name, city_state, brewery_type,
        brewery_logo, beers, description, badges } = brewery

    // const handleClickBeer = (beerIDnum) => {
    //     dispatch(thunkOneBeer(beerIDnum))


    //     history.push(`/beer/${beerIDnum}`)
    // }
    // const handleClickBrewery = () => {
    //     dispatch(thunkOneBrewery(id))


    //     history.push(`users/${user?.id}/brewery`)
    // }

    const deleteBadgeClick = (id) => {
        dispatch(thunkDeleteBadge(id))
        dispatch(thunkMyBrewery(user?.id))
        window.alert("badge has been deleted!")
    }


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
                    <div style={{display: 'flex', flexDirection:'column'}}>
                    Badges:
                    {badges.map(x => (
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <div>
                                <img src={x.icon} alt="1x" style={{width: '3vw', height: '3vw'}}/>
                            </div>
                            <button id="create-badge-on-brewery-button" style={{height:'fit-content', color: 'white', borderRadius: '1vw' }}
                            onClick={() => deleteBadgeClick(x.id)}>Delete</button>
                        </div>
                    ))}
                    </div>
                        <div className="brewery-name-city-type-container">{/**starts Brewery info */}
                                <div>Name: {name}</div>
                                <div>City/State:{city_state}</div>
                                <div>Brewery Type: {brewery_type}</div>
                            </div>{/**Closes Brewery Info*/}
                            <div className="badges-container">
                                Badges:
                                {badges.map(x => (
                                    <div className="individual-badges" style={{ width: '5vw', height: '5vw' }}>
                                        <img src={x.icon} alt="2x" style={{ width: '5vw', height: '5vw' }} />
                                        <div onClick={() => deleteBadgeClick(x.id)}>X</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="brewery-info-description">
                            <div>
                                Description:{description}
                            </div>

                        </div>
                    </div>

                    <div>
                        <h1 style={{ color: "green", fontFamily: "logo", width: "fit-content" }}>
                            {name}'s Selection of Beer
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
