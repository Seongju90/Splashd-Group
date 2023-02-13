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
    const response = await fetch(`/api/reviews/${id}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

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

export const thunkCreateReview = (form, id) => async(dispatch) => {
    const response = await fetch(`/api/beer/${id}/review`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(form)
	})

    // console.log('in my thunk!!!!!', response)

    if(response.ok) {
        const data = await response.json()
        dispatch(actionCreateReview(data))
        return null
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
            let review = action.review
            // console.log('reducer for one review, review)
            newState.onereview = review
            return newState
        case CREATE_REVIEW:
            let add = action.review
            // console.log('reducer for create review', add)
            newState[add.id] = add
            return newState
        default:
            return state;
    }
}


export default reviewsReducer
