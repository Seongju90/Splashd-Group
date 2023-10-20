import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
// import { useHistory, NavLink, Redirect } from 'react-router-dom';
import { thunkOneBeer } from '../../store/beer';
import ReviewFormModal from '../ReviewFormModal';
import OpenModalButton from '../OpenModalButton';
import { thunkOneBrewery } from '../../store/brewery';
// import BadgeFormModal from '../BadgeFormModal';
// import ReviewEditModal from '../ReviewEditModal'
import ReviewCard from '../ReviewCard';
import '../../zCSS/beerone.css'
// import checkicon from '../../assets/checkicon.png'

export default function OneBeer(props) {
    const dispatch = useDispatch()
    const { id } = useParams()
    const history = useHistory()
    const user = useSelector(state => state.session?.user)
    const beer = useSelector(state => state.beer?.onebeer)
    const avg = Math.round(beer?.avg * 100) / 100;
    const num_badges = beer?.badges.length




    useEffect(() => {
        dispatch(thunkOneBeer(id))
    }, [dispatch, id]);
    const handleClick = () => {
        dispatch(thunkOneBrewery(beer.brewery_id))
        history.push(`/brewery/${beer.brewery_id}`)
    }

    const userChecks = beer?.reviews.filter(rev =>
        {
           return rev?.user_id === user?.id
        })
        const revList = beer?.reviews;
        let revSet = new Set()

    for (let i = 0; i < revList?.length; i++) {
        revSet.add(revList[i]?.user_id)
    }
    //dispatch happens before history.push
    //     //so, we may not need this

    return (
        <div className='beer-feed'>
            <div className='onebeer-header'>
                <img className='beer-logo' src={beer?.beer_logo} alt="beer-logo" />
                <div className='brewery-info'>
                    <h1>{beer?.name}</h1>
                    <h2 id="brewLink" onClick={handleClick}>{beer?.brewery.name}</h2>
                    <h4>{beer?.type}</h4>
                </div>
                <div className='review-stats'>
                    <div className="g g1 g2" >
                        <div>Total Check-ins:</div>
                        <div>{beer?.num_reviews}</div>
                    </div>
                </div>

                <div className='beer-info'>
                    <div className='beerdata left'>{beer?.abv} abv</div>
                    <div className='beerdata mid'>{beer?.ibu} IBU</div>
                    <div className='beerdata mid'>Average rating: {avg}</div>
                    <div className='beerdata right'>{beer?.num_reviews} Ratings</div>

                </div>
                <div className="bottom">
                    <div className='description'>{beer?.description}</div>
                    <div title="Check-In" className='cc'>
                        {/* <img className="check" src={checkicon}/> */}
                        <OpenModalButton
                            buttonText={''}
                            location={'check-in'}
                            modalComponent={<ReviewFormModal id={beer?.id} />}
                        />
                    </div>
                </div>
            </div>
            <div>
                <h2 id="checkin-title">Check-Ins</h2>
                {beer?.reviews.map((x) =>
                    <div location className='review-container'>
                        <ReviewCard review={x} beer={beer} username={x.user?.username} location={x} />
                        {/* {x?.user_id === user?.id ? (
                            <OpenModalButton
                                buttonText="Edit/Delete"
                                // onItemClick={closeMenu}
                                modalComponent={<ReviewEditModal
                                    rev={x} />}
                            />
                        ):null} */}
                    </div>
                )}
            </div>
            {/* <div>
            <div
            className='div-button push-button'
               onClick={handleClick }
                   >Check Out The Brewery
            </div>
            </div> */}

            {/* {beer?.brewery.owner_id === user?.id ? (
                <OpenModalButton
                    buttonText="Create a Badge"
                    modalComponent={<BadgeFormModal id={beer?.id} />}
                />
                ) : null
                } */}
            {/* <OpenModalButton
                buttonText="Check In This Beer"
                // onItemClick={closeMenu}
                modalComponent={<ReviewFormModal id={beer?.id} />}
            /> */}
        </div>

    )
}
