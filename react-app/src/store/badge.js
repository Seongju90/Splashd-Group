/* ---------- TYPE VARIABLES ---------- */

const ALL_BADGE = "badge/ALL_BADGE"
const CREATE_BADGE = "badge/CREATE_BADGE"

/* ---------- ACTION CREATORS ---------- */

const actionAllBadge = (badge) => {
    return {
        type: ALL_BADGE,
        badge
    }
}

const actionCreateBadge = (badge) => {
    return {
        type: CREATE_BADGE,
        badge
    }
}

/* ---------- THUNK ACTION CREATORS ---------- */

export const thunkAllBadge = (id) => async(dispatch) => {
    const response = await fetch(`/api/users/${id}/badges`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

    if (response.ok) {
        const badge = await response.json()
        // to unnest badge in reducer
        dispatch(actionAllBadge(badge.badges))
        return response
    }
    else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) return data;
	}
	else return { errors: "An error occurred. Please try again." }
}

/* ---------- BADGE REDUCER ---------- */

const initialState = {}
const badgeReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case ALL_BADGE:
            console.log('hi reducer', action)
            newState['user_badges'] = action.badge
            return newState
        case CREATE_BADGE:
            return newState
        default:
        return state;
    }
}


export default badgeReducer
