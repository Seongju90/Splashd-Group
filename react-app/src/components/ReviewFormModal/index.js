import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateReview } from "../../store/review";

// later when things are set up, pass beerId as a prop to this modl
function ReviewFormModal() {
    const dispatch = useDispatch()

    const [imageUrl, setImageUrl] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    // console.log('review', review)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = [];

        const data = await dispatch(thunkCreateReview(
            {
                "image": imageUrl,
                "review_text": review,
                "rating": rating
            },
            // we will add the beerId here to send to our thunk
        ))

        // front-end validations
        if (!review) error.push("Review is required")
        if (!rating) error.push("Rating input is required")
        if (rating === 0 || rating > 5) error.push("Rating can only be from 1 to 5")

        // Url validations
        const splitUrl = imageUrl.split(".")
        const validImageTypes = ["png", "jpeg", "jpg"]
        const validUrl = splitUrl.some(urlString => validImageTypes.includes(urlString))

        if (validUrl.length <= 10 || validUrl > 255) errors.push("Length of valid url must be between 10 and 255 characters")

        if (!validUrl) {
            error.push("Images must end with png, jpeg, or jpg format")
        }

        setErrors(error)
        if (error.length) return;

        if (data) {
            setErrors(data.errors);
        } else {
            closeModal();
        }
    }

    return (
        <>
            <h1>Create</h1>
            <form onSubmit={handleSubmit}>
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
                <label>
                    Rating
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    />
                </label>
                <button type="submit">Submit a Review</button>
            </form>
        </>
    )
}


export default ReviewFormModal
