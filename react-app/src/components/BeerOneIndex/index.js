import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { useHistory, NavLink, Redirect } from 'react-router-dom';
import { thunkOneBeer } from '../../store/beer';
import ReviewFormModal from '../ReviewFormModal';
import OpenModalButton from '../OpenModalButton';


export default function OneBeer(props) {
    const dispatch = useDispatch()
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const beer = useSelector(state => state.beer.onebeer)

    console.log(beer, props.beer)
    useEffect(() => {
        dispatch(thunkOneBeer(id))
    }, [id]);
    // console.log(myimgs)

    return (
        <div>
            <h1>
            beer name is {beer?.name}
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
        </div>

    )
}
