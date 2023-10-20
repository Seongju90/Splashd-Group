import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { useHistory, NavLink, Redirect } from 'react-router-dom';
// import { thunkOneBeer } from '../../store/beer';
import { thunkOneBrewery } from '../../store/brewery';
import OpenModalButton from '../OpenModalButton';
// import BreweryFormModal from '../BreweryFormModal';
// import BeerFormModal from '../BeerFormModal'
import BeerEditModal from '../BeerEditModal'
import BeerCard from '../BeerCard';
import '../../zCSS/breweryone.css'

export default function OneBrewery() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const brewery = useSelector(state => state.brewery.onebrewery)
    const beers = brewery?.beers
    let num_ratings = 0
    let avg = 0
    beers?.forEach(beer => {
        num_ratings += beer.num_reviews
        avg += beer.avg
    })
    avg = Math.floor((avg / beers?.length) * 100) / 100

    useEffect(() => {
        dispatch(thunkOneBrewery(id))
        //dispatch happens before history.push
        //so, we may not need this
    }, [dispatch, id]);

    // const handleBeerClick = (beerId) => {
    //     dispatch(thunkOneBeer(beerId))
    //     history.push(`/beer/${beerId}`)
    // }

    return (
        <div className='beer-feed'>
            <div className='brewery-header'>
                <img className='brew-logo' src={brewery?.brewery_logo} alt="3x" />
                <div className='brewery-info'>
                    <h1>{brewery?.name}</h1>
                    <h4>{brewery?.brewery_type}</h4>
                    <h5>{brewery?.city_state}</h5>
                </div>
            <div className='brewery-stats'>
            <div className="g g1 g2" >
                        <div>Total Check-ins:</div>
                        <div>{num_ratings}</div>
            </div>
            <div className="g g1" >Unique: </div>
            <div className="g g2" >Badges Available: </div>
            <div className="g">User Checkins: </div>
            </div>
            </div>
        <div className='brew-info'>
                <div className='beerdata left'>Average Rating: {avg}</div>
                <div className='beerdata mid'>Total Ratings: {num_ratings}</div>
                <div className='beerdata right'>{beers?.length} beers</div>
        </div>
            {/* {brewery?.owner_id === user?.id ? (
                <OpenModalButton
                    buttonText="Make a Beer"
                    //   onItemClick={closeMenu}
                    modalComponent={<BeerFormModal id={brewery?.id} />}
                />
            ) : null
            } */}


            <div>

                {brewery?.beers.map((x) =>

                    <div className='card-container'>
                        <BeerCard beer={x} />
                        {brewery?.owner?.id === user?.id ? (
                            <OpenModalButton
                                buttonText="Edit/Delete"
                                modalComponent={<BeerEditModal beer={x} />}
                            />
                        ) : null}
                    </div>
                )}

            </div>

        </div>

    )
}
