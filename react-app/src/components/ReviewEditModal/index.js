import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkEditReview, thunkDeleteReview } from "../../store/review";
import { thunkOneBeer } from "../../store/beer"


// later when things are set up, pass beerId as a prop to this modl
export default function EditReviewModal({ rev }) {
    const dispatch = useDispatch()

    const [imageUrl, setImageUrl] = useState(rev.image);
    const [review, setReview] = useState(rev.review_text);
    const [rating, setRating] = useState(rev.rating);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const beer = useSelector(state => state.beer.onebeer)

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
            // dispatch(thunkOneBeer(beer.id))
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
            <form className="modal-form"
                onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    Image Url
                    <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </label>
                <label>
                    Review
                    <input
                        type="text"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                </label>
                <div>

                    <input
                        type="range"
                        value={rating}
                        min='0'
                        max='5'
                        step='.25'



                        onChange={(e) => setRating(e.target.value)}
                    />
                    Rating:{rating}
                </div>
                <>
                    <button type="submit">Edit a Review</button>
                </>
                <>
                    <button type="button"
                        onClick={handleDelete}
                    >Delete A Review</button>
                </>
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
