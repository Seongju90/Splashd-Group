import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
// import { useHistory, NavLink, Redirect } from 'react-router-dom';
import { thunkOneBeer } from '../../store/beer';
import { thunkOneBrewery } from '../../store/brewery';
import OpenModalButton from '../OpenModalButton';
// import BreweryFormModal from '../BreweryFormModal';
import BeerFormModal from '../BeerFormModal'
import BeerEditModal from '../BeerEditModal'
import BeerCard from '../BeerCard';


export default function OneBrewery() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const brewery = useSelector(state => state.brewery.onebrewery)
    const history = useHistory()

    // console.log(beer, props.beer)
    useEffect(() => {
        dispatch(thunkOneBrewery(id))
        //dispatch happens before history.push
        //so, we may not need this
    }, []);
    // console.log(myimgs)
    const handleBeerClick = (beerId) => {
        dispatch(thunkOneBeer(beerId))
        history.push(`/beer/${beerId}`)
    }

    return (
        <div className='beer-feed'>
            <div className='onebeer-header'>
                <img src={brewery?.brewery_logo} alt={null} />
                <div className='brewery-info'>
                    <h1>{brewery?.name}</h1>
                    <h4>{brewery?.type}</h4>
                    <h5>{brewery?.city_state}</h5>
                </div>

            </div>

            {brewery?.owner_id === user?.id ? (
                <OpenModalButton
                    buttonText="Make a Beer"
                    //   onItemClick={closeMenu}
                    modalComponent={<BeerFormModal id={brewery?.id} />}
                />
            ) : null
            }


            <div>

                {brewery?.beers.map((x) =>

                    <div>
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
