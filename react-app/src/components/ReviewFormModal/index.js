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



    const handleSubmit = async (e) => {
        e.preventDefault();

        let url
        imageUrl ? url = imageUrl : url = null

        const data = await dispatch(thunkCreateReview(
            {
                "image": url,
                "review_text": review,
                "rating": +rating
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
                                    placeholder='Describe your experience'

                    type="text"
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
                    <button type="submit" id="modal-submit">Submit</button>
                </div>
            </form>
        </div>
    )
}


export default ReviewFormModal
