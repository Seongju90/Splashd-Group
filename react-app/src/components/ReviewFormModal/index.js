import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateReview } from "../../store/review";

function ReviewFormModal() {
    const dispatch = useDispatch()

    const [imageUrl, setImageUrl] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = [];

        const newReview = {
            imageUrl,
            review,
            rating
        }

        const splitUrl = imageUrl.split(".")
        const validImageTypes = ["png", "jpeg", "jpg"]
        const validUrl = imageUrl.some(urlString => validImageTypes.includes(urlString))

        if (!validUrl) {
            error.push("Images must end with png, jpeg, or jpg format")
        }
    }
    return ()
}


export default ReviewFormModal
