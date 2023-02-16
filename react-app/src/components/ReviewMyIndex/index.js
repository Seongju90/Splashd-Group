import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { thunkMyReviews } from '../../store/review';
import { thunkOneBeer } from '../../store/beer';
import ReviewCard from '../ReviewCard';
import '../../zCSS/reviewcard.css'

export default function MyReviews() {
    const dispatch = useDispatch()

    let user = useSelector(state => state.session?.user)
    let userId = user?.id

    let myReviews = useSelector(state =>  state.reviews?.myreviews)
    const beer_list = useSelector(state => state.beer )

    useEffect(() => {
        dispatch(thunkMyReviews(userId))
    }, [dispatch])

    return (
        <div className="my-reviews-main-container">
            {myReviews?.length ? myReviews.map(review =>
            // change location prop to truthy value to get rid of beer info on ReviewCard
                <ReviewCard beer={review.beer} username={user?.username} review={review} location={0}/>
            ) : <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', width: '100vw' }}>
            <h1 style={{ paddingTop: '5vw', fontFamily: 'Bold' }}>Sorry! Out Of Luck!</h1>
            <h3 style={{ paddingTop: '8vw' }}>You need to checkin a Beer!</h3>
        </div>}
        </div>
    )
}
