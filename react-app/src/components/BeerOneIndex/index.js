import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
// import { useHistory, NavLink, Redirect } from 'react-router-dom';
import { thunkOneBeer } from '../../store/beer';
import ReviewFormModal from '../ReviewFormModal';
import OpenModalButton from '../OpenModalButton';
import { thunkOneBrewery } from '../../store/brewery';
import BadgeFormModal from '../BadgeFormModal';
import ReviewEditModal from '../ReviewEditModal'

export default function OneBeer(props) {
    const dispatch = useDispatch()
    const { id } = useParams()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const beer = useSelector(state => state.beer.onebeer)

    console.log(beer, props.beer)
    useEffect(() => {
        dispatch(thunkOneBeer(id))
    }, [id]);
    const handleClick = () => {
        dispatch(thunkOneBrewery(beer.brewery_id))
        history.push(`/brewery/${beer.brewery_id}`)
    }
        //dispatch happens before history.push
    //     //so, we may not need this
    // console.log(myimgs)

    return (
        <div>
            <h1>
            BEER PAGE FOR ---{beer?.name}
            </h1>
            <h2>
                Current user is   {user?.name}
            </h2>
            <h4>
                --abv:{beer?.abv}--
                --num revs:{beer?.num_reviews}--
                -- brewery id : {beer?.brewery_id}
                --desc: {beer?.description}--
            </h4>
            <div>
                {beer?.reviews.map((x) =>
                    <h1>
                        REVIEW ID: {x.id} RATING: {x.rating} REVIEW: {x.review_text}
                        {x?.user_id === user?.id ? (
                            <OpenModalButton
                                buttonText="Edit/Delete"
                                // onItemClick={closeMenu}
                                modalComponent={<ReviewEditModal
                                    rev={x} />}
                            />
                        ):null}
                    </h1>
                )}
            </div>
            <div>
            <button
               onClick={handleClick }
                   >Check Out The Brewery</button>
            </div>

                {beer?.brewery.owner_id === user?.id ? (
                <OpenModalButton
                    buttonText="Create a Badge"

                    // onItemClick={closeMenu}
                    modalComponent={<BadgeFormModal id={beer?.id} />}
                />
                ) : null
                }
                <OpenModalButton
                buttonText="Check In This Beer"
                // onItemClick={closeMenu}
                modalComponent={<ReviewFormModal id={beer?.id} />}
            />
        </div>

    )
}
