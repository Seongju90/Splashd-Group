import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { thunkOneReview } from "../../store/review"
import { useParams } from "react-router-dom"
import ReviewFormModal from "../ReviewFormModal"
import OpenModalButton from "../OpenModalButton";

const ReviewDetails = () => {
    const dispatch = useDispatch()

    const { reviewId } = useParams()

    useEffect(() => {
        dispatch(thunkOneReview(reviewId))
    }, [dispatch, reviewId])

    return(
        <OpenModalButton
            buttonText="Create a Review"
            modalComponent={<ReviewFormModal/>}
        />
    )
}

export default ReviewDetails
