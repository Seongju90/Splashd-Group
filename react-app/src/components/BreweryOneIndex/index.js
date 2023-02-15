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
        <div>
            <h1>
                Brewery name is {brewery?.name}
            </h1>
            <h2>
                Current user is   {user?.name}
            </h2>
            <h4>
                --brewery_type:{brewery?.brewery_type}--
                --city_state:{brewery?.city_state}--
                -- owner_id : {brewery?.owner_id}
                --brewery_logo:
                <div>
                    <img key={`brewerylogo${id}`}
                        src={`${brewery?.brewery_logo}`}
                        alt='previewimageforcard'
                    />
                </div>
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
            </h4>
            {brewery?.owner_id === user?.id ? (
            <OpenModalButton
                buttonText="Make a Beer"
                //   onItemClick={closeMenu}
                modalComponent={<BeerFormModal id={brewery?.id} />}
            />
            ) : null
                }
        </div>

    )
}
