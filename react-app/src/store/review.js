import  { csrfFetch } from "./csrf";

/* ---------- TYPE VARIABLES ---------- */

const ONE_REVIEW = "review/ONE_REVIEW"
const CREATE_REVIEW = "review/CREATE_REVIEW"
const EDIT_REVIEW = "review/EDIT_REVIEW"
const DELETE_REVIEW = "review/DELETE_REVIEW"

/* ---------- ACTION CREATORS ---------- */

const actionOneReview = (review) => {
    return {
        type: ONE_REVIEW,
        review
    }
}

const actionCreateReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

const actionEditReview = (review) => {
    return {
        type: EDIT_REVIEW,
        review
    }
}

const actionDeleteReview = (id) => {
    return {
        type: DELETE_REVIEW,
        id
    }
}

/* ---------- THUNK ACTION CREATORS ---------- */

export const thunkOneReview = (id) => async(dispatch) => {
    const response = await csrfFetch(`/api/reviews/${id}`)

    if (response.ok) {
        const review = await response.json()
        dispatch(actionOneReview(review))
        return response
    }
    else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) return data;
	}
	else return { errors: "An error occurred. Please try again." }
}


/* ---------- REVIEWS REDUCER ---------- */

const initialState = {}
const reviewsReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case ONE_REVIEW:
            console.log('action in reducer', action)
            let review = action.review
            newState.onereview = review
            return newState
        default:
            return state;
    }
}


export default reviewsReducer
