import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkOneReview } from "../../store/review"
import { useParams, useHistory } from "react-router-dom"
import ReviewFormModal from "../ReviewFormModal"
import OpenModalButton from "../OpenModalButton";

const ReviewDetails = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const { reviewId } = useParams()

    const review = useSelector(state => console.log('what is in here', state.reviews))


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
