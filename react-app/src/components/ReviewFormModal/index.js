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
        ))

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
