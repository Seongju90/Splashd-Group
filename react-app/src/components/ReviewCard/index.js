import profile from '../../assets/profile.png'
import '../../zCSS/reviewcard.css'
import { thunkOneBeer } from '../../store/beer'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import OpenModalButton from '../OpenModalButton'
import EditReviewModal from '../ReviewEditModal'

export default function ReviewCard({username, review, beer}) {
    const history = useHistory()
    const dispatch = useDispatch()
    if(!beer){
        let beer = review.beer
    }
    let beerId = beer.id
    let beerLogo = beer.beer_logo
    let beerName = beer.name
    let reviewText = review.review_text
    let reviewImage = review.image
    let beerRating = review.rating

    if (!reviewImage) {
        reviewImage = 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found-300x169.jpg'
    }

    const navigateToBeer = (beerId) => {
        dispatch(thunkOneBeer(beerId))
        history.push(`/beer/${beerId}`)
    }

    return (
        <div className="review-main-container">
            <div className="review-left-container">
                <div className="review-user-container">
                    <div className="review-profile-icon">
                        <img className="review-user-icon" src={profile}/>
                    </div>
                    <div className="review-user-info">
                        Username: {username}
                    </div>
                    <div className="review-navigate-beer-container">
                        <div className="review-navigate-text">
                        </div>
                        <OpenModalButton
                                buttonText="Edit/Delete"
                                // onItemClick={closeMenu}
                                modalComponent={<EditReviewModal
                                    rev={review} />}
                        />
                    </div>
                </div>
                <div className="review-beer-container">
                    <div className="review-sub-beer-container">
                        <img className="review-beer-logo" src={beerLogo}/>
                        <div className="review-beer-name">{beerName}</div>
                    </div>
                    <div className="review-rating-container">
                        Rating: {beerRating}
                    </div>
                </div>
                <div className="review-text-container">
                    Review: {reviewText}
                </div>
            </div>
            <div className="review-right-container-img">
                <img className="review-images" src={reviewImage}/>
            </div>
        </div>
    )
}
