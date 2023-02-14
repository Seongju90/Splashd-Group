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

export const thunkAllBadge = (id) => async (dispatch) => {
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
    else return { errors: ["An error occurred. Please try again."] }
}

export const thunkCreateBadge = (form, beerId) => async (dispatch) => {
    // console.log(form)
    const response = await fetch(`/api/brewery/${beerId}/badge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
    })
    // console.log(response, 'this is respond from backend')
    if (response.ok) {
        const data = await response.json();
        // console.log(data, '!!just came from backend')
        dispatch(actionCreateBadge(data));
        return null
    }
    else if (response.status < 500) {
        const data = await response.json();
        // console.log(data, 'ERROR STUFF')
        if (data.errors) return data;
    }
    else return { errors: ["An error occurred. Please try again."] }
}
/* ---------- BADGE REDUCER ---------- */
// todo: badge reducer, create get all badges reducer
const initialState = {}
const badgeReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case ALL_BADGE:
            console.log('hi reducer', action)
            newState['user_badges'] = action.badge
            return newState
        case CREATE_BADGE:
            newState[action.badge.id] = action.badge
            return newState
        default:
            return state;
    }
}


export default badgeReducer
