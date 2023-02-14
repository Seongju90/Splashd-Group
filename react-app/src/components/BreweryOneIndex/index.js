import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { useHistory, NavLink, Redirect } from 'react-router-dom';
// import { thunkOneBeer } from '../../store/beer';
import { thunkOneBrewery } from '../../store/brewery';
import OpenModalButton from '../OpenModalButton';
// import BreweryFormModal from '../BreweryFormModal';
import BeerFormModal from '../BeerFormModal'


export default function OneBrewery() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const brewery = useSelector(state => state.brewery.onebrewery)

    // console.log(beer, props.beer)
    useEffect(() => {
        dispatch(thunkOneBrewery(id))
        //dispatch happens before history.push
        //so, we may not need this 
    }, []);
    // console.log(myimgs)
    // const handleBeerClick = () => {

    // }

    return (
        <div>
            <h1>
                beer name is {brewery?.name}
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
                {console.log(brewery?.beers)}
                {brewery?.beers.map((x) => 
                    <h1>
                       Beer {x.id} is {x.name}
                    </h1>
                )}
            </h4>
            here is where a owner check goes
            <OpenModalButton
                buttonText="Make a Beer"
                //   onItemClick={closeMenu}
                modalComponent={<BeerFormModal id={brewery?.id}/>}
            />
        </div>

    )
}
