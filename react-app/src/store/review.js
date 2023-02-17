import { thunkOneBeer} from "./beer";

/* ---------- TYPE VARIABLES ---------- */

const ONE_REVIEW = "review/ONE_REVIEW"
const CREATE_REVIEW = "review/CREATE_REVIEW"
const EDIT_REVIEW = "review/EDIT_REVIEW"
const DELETE_REVIEW = "review/DELETE_REVIEW"
const MY_REVIEW = "review/MY_REVIEW"

/* ---------- ACTION CREATORS ---------- */

export const actionOneReview = (review) => {
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

const actionMyReview = (review) => {
    return {
        type: MY_REVIEW,
        review
    }
}
/* ---------- THUNK ACTION CREATORS ---------- */

export const thunkOneReview = (id) => async(dispatch) => {
    const response = await fetch(`/api/reviews/${id}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

    if (response.ok) {
        const review = await response.json()
        dispatch(actionOneReview(review))
        return null
    }
    else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}

export const thunkCreateReview = (form, id) => async(dispatch) => {
    console.log('asdasdasdwwadw', form)
    const response = await fetch(`/api/beer/${id}/review`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(form)
	})

    // console.log('in my thunk!!!!!', response)

    if(response.ok) {
        const data = await response.json()
        await dispatch(thunkOneBeer(data.beer_id))
        dispatch(actionCreateReview(data))
        return null
    }
    else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}

export const thunkEditReview = (form, rev) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${rev.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
    })


    if (response.ok) {
        const data = await response.json()
        dispatch(actionEditReview(data))
        // console.log('in my thunk!!!!!', response)
        return null
    }
    else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) return data;
    }
    else return { errors: ["An error occurred. Please try again."] }
}

export const thunkDeleteReview = (rev) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${rev.id}`, {
        method: "DELETE"
    })
    console.log("in my thunk checking")
    if (response.ok) {
        // const data = await response.json();
        await dispatch(thunkOneBeer(rev.beer_id))
		dispatch(actionDeleteReview(rev.id));

		return null
	}
	else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}

export const thunkMyReviews = (id) => async(dispatch) => {
    const response = await fetch(`/api/users/${id}/reviews`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

    if (response.ok) {
        const review = await response.json()
        dispatch(actionMyReview(review))
        return null
    }
    else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}

/* ---------- REVIEWS REDUCER ---------- */

const initialState = {}
const reviewsReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case ONE_REVIEW:
            let review = action.review
            // console.log('reducer for one review, review)
            newState.onereview = review
            newState[review.id] = review
            return newState
        case CREATE_REVIEW:
            let add = action.review
            // console.log('reducer for create review', add)
            newState[add.id] = add
            return newState
        case EDIT_REVIEW:
            let edit = action.review
            newState[edit.id] = edit
            return newState
        case MY_REVIEW:
            // console.log('reducer actionreview', action.review)
            newState['myreviews'] = action.review.Reviews
            return newState
        case DELETE_REVIEW:
            // console.log("reducer", action)
            delete newState[action.id]
            return newState
        default:
            return state;
    }
}


export default reviewsReducer
