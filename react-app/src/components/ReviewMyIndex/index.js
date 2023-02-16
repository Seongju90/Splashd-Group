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
                <ReviewCard beer={review.beer} username={user?.username} review={review}/>
            ) : null}
        </div>
    )
}
