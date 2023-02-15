import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { thunkMyReviews } from '../../store/review';
import { thunkOneBeer } from '../../store/beer';


export default function MyReviews() {
    const dispatch = useDispatch()
    const history = useHistory()

    let user = useSelector(state => state.session?.user)
    let userId = user?.id

    let myReviews = useSelector(state =>  state.reviews?.myreviews)

    useEffect(() => {
        dispatch(thunkMyReviews(userId))
    }, [dispatch])

    const handleClickBeer = (beerIDnum) => {
        dispatch(thunkOneBeer(beerIDnum))


        history.push(`/beer/${beerIDnum}`)
    }

    return (
        <div className="review-main-container">
            <div className="review-left-container">
                <div className="review-profile-icon">
                    <i class="fa-solid fa-circle-user"></i>
                </div>
                <div className="review-user-info">

                </div>
            </div>
            <div className="review-right-container-img">

            </div>
        My Reviews
        {myReviews?.length ? myReviews.map(review =>
            <div>Review Id: {review.id} Beer Id: {review.beer_id}
                <button
                onClick={() => handleClickBeer(review.beer_id)}
                >
               Go to my review
                </button>
            </div>
        ) : <h1>help</h1>}
        </div>
    )
}
