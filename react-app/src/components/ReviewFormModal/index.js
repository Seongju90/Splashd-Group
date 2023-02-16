import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateReview } from "../../store/review";

// later when things are set up, pass beerId as a prop to this modl
function ReviewFormModal({ id }) {
    const dispatch = useDispatch()

    const [imageUrl, setImageUrl] = useState(null);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    // console.log(id)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = [];
        let url
        imageUrl ? url = imageUrl : url = null

        const data = await dispatch(thunkCreateReview(
            {
                "image": url,
                "review_text": review,
                "rating": Number(rating)
            }, id
            // we will add the beerId here to send to our thunk
        ))

        // front-end validations
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

        if (data) {
            setErrors(data.errors);
        } else {
            closeModal();
        }
    }

    return (
        <div className="modal-whole">
            <div className="modal-header">
                <div className="modal-title">Check-In</div>
                <div>
                    {errors.map((error, idx) => (
                        <>{error}</>
                    ))}
                </div>
                <div className="modal-exit"
                    onClick={() => closeModal()}
                >X</div>
            </div>


            <form className="modal-form"
                onSubmit={handleSubmit}>

                <div>

                    Image Url
                    <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />

                </div>
                <div>
                    Review
                    <input
                        type="text"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                </div>

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

                <button type="submit">Submit a Review</button>
            </form>
        </div>
    )
}


export default ReviewFormModal
