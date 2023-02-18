import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkEditReview, thunkDeleteReview, thunkMyReviews } from "../../store/review";
import { thunkOneBeer } from "../../store/beer"


// later when things are set up, pass beerId as a prop to this modl
export default function EditReviewModal({ rev }) {
    const dispatch = useDispatch()

    const [imageUrl, setImageUrl] = useState(rev.image);
    const [review, setReview] = useState(rev.review_text);
    const [rating, setRating] = useState(rev.rating);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    // const beer = useSelector(state => state.beer.onebeer)
    const userId = useSelector(state => state.session?.user?.id)

    const handleSubmit = async (e) => {
        e.preventDefault();


        const data = await dispatch(thunkEditReview(
            {
                "image": imageUrl,
                "review_text": review,
                "rating": Math.floor(rating)
            }, rev

        ))


        if (data) {
            setErrors(data.errors);
        } else {
            // dispatch(thunkMyReviews(userId))
            closeModal();
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();


        const data = await dispatch(thunkDeleteReview(
            rev))


        if (data) {
            setErrors(data.errors);
        } else {
            dispatch(thunkMyReviews(userId))
            closeModal();
        }
    }
    return (
        <div className="modal-whole">
            <div className="modal-header">
                <div className="modal-title">Edit Your Review</div>
                <div className="error-cont">
                    {errors.map((error) => (
                        <div classname='error-message'>{error}</div>
                    ))}
                </div>
                <div className="modal-exit"
                    onClick={() => closeModal()}
                >X</div>
            </div>
            <form id='modal-form' className="modal-form"
                onSubmit={handleSubmit}>
                <div>
                    Image Url
                </div>
                <input
                                    placeholder='http://image.io'

                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <div>
                    Review
                </div>
                <input
                    type="textarea"
                    value={review}

                    onChange={(e) => setReview(e.target.value)}
                />
                <div id='rating-box'>
                    <div >
                        Rating:
                    </div>
                    {rating}
                </div>
                <input
                    type="range"
                    value={rating}
                    min='0'
                    max='5'
                    step='1'
                    onChange={(e) => setRating(e.target.value)}
                />
                <div>
                    <button type="submit" id="modal-submit">Edit</button>
                </div>
                <div>
                    <button type="button" id='delete-button'
                        onClick={handleDelete}
                    >Delete</button>
                </div>
            </form>
        </div>
    )
}


// export default EditFormModal


  // // front-end validations
        // if (!review) error.push("Review is required")
        // if (!rating) error.push("Rating input is required")
        // if (rating === 0 || rating > 5) error.push("Rating can only be from 1 to 5")

        // Url validations
        // const splitUrl = imageUrl.split(".")
        // const validImageTypes = ["png", "jpeg", "jpg"]
        // const validUrl = splitUrl.some(urlString => validImageTypes.includes(urlString))

        // if (validUrl.length <= 10 || validUrl > 255) errors.push("Length of valid url must be between 10 and 255 characters")

        // if (!validUrl) {
        //     error.push("Images must end with png, jpeg, or jpg format")
        // }

        // setErrors(error)
        // if (error.length) return;
