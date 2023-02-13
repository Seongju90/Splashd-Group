import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { useHistory, NavLink, Redirect } from 'react-router-dom';
import { thunkOneBeer } from '../../store/beer';
import ReviewFormModal from '../ReviewFormModal';
import OpenModalButton from '../OpenModalButton';


export default function OneBeer() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const user = useSelector(state => state.session?.user)
    const beer = useSelector(state => state?.beer.onebeer)

    console.log(beer)
    useEffect(() => {
        dispatch(thunkOneBeer(id))
    }, [id]);
    // console.log(myimgs)

    return beer && (
        <div>
            <h1>
                beer name is {beer?.onebeer.name}
            </h1>
            <h2>

                Current user is   {user?.name}
            </h2>
            <h4>
                --abv:{beer?.onebeer.abv}--
                --num revs:{beer?.onebeer.reviews.length}--
                -- brewery id : {beer?.onebeer.brewery_id}
                --desc: {beer?.onebeer.description}--
            </h4>

            <>
                {Object.values(beer?.onebeer?.reviews).length ? Object.values(beer?.onebeer?.reviews).map(review =>
                    // <ReviewCard beer={beer} user={user}/> will need to come soon, for now this:
                    <>
                        --{review?.rating}--
                        -- <>{review?.beer_id}</>--
                        --<>{review?.user?.name}</>--
                    </>
                ) :
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', width: '100vw' }}>
                        <h1 style={{ paddingTop: '5vw', fontFamily: 'Bold' }}>Sorry! Out Of Luck!</h1>
                        <h3 style={{ paddingTop: '8vw' }}>Try searching for something less specific!</h3>
                    </div>

                }
            </>
            <>
                <OpenModalButton
                    buttonText="Create Review"
                    // onItemClick={closeMenu}
                    modalComponent={<ReviewFormModal />}
                />
            </>
        </div>
    )
}