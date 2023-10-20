/* ---------- TYPE VARIABLES ---------- */

const MY_BADGES = "badge/MY_BADGES"
const CREATE_BADGE = "badge/CREATE_BADGE"
const ALL_BADGES = "badge/ALL_BADGES"
const DELETE = 'badge/DELETE'
/* ---------- ACTION CREATORS ---------- */

const actionUserBadges = (badge) => {
    return {
        type: MY_BADGES,
        badge
    }
}

const actionCreateBadge = (badge) => {
    return {
        type: CREATE_BADGE,
        badge
    }
}

const actionAllBadges = (badges) => {
    return {
        type: ALL_BADGES,
        badges
    }
}
const actionDeleteBadge = (id) => {
    return {
        type: DELETE,
        id
    }
}

/* ---------- THUNK ACTION CREATORS ---------- */

export const thunkMyBadges = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/badges`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const badge = await response.json()
        // to unnest badge in reducer
        dispatch(actionUserBadges(badge.badges))
        return null
    }
    else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) return data;
    }
    else return { errors: ["An error occurred. Please try again."] }
}

export const thunkAllBadges = () => async (dispatch) => {
    const response = await fetch(`/api/badges/all`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const badges = await response.json()
        // to unnest badge in reducer
        dispatch(actionAllBadges(badges.badges))
        return null
    }
    else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) return data;
    }
    else return { errors: ["An error occurred. Please try again."] }
}

export const thunkCreateBadge = (form, beerId) => async (dispatch) => {

    const response = await fetch(`/api/brewery/${beerId}/badge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
    })

    if (response.ok) {
        const data = await response.json();

        dispatch(actionCreateBadge(data));
        return null
    }
    else if (response.status < 500) {
        const data = await response.json();

        if (data.errors) return data;
    }
    else return { errors: ["An error occurred. Please try again."] }
}

export const thunkDeleteBadge = (id) => async (dispatch) => {
    const response = await fetch(`/api/badges/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
    })

    if (response.ok) {
        dispatch(actionDeleteBadge(id));
        return null
    }
    else if (response.status < 500) {
        const data = await response.json();

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
        case MY_BADGES:

            newState.mybadges = action.badge
            return newState
        case CREATE_BADGE:
            newState[action.badge.id] = action.badge
            return newState
        case ALL_BADGES:
            let all = action.badges

            for (let b of all) newState[b.id] = b
            return newState;
        case DELETE:
            delete newState[action.id]
            // delete newState.mybadges[action.id]
            newState.mybadges = newState.mybadges?.map(x => x.id === action.id ? x=null : x = x)
            return newState
        default:
            return state;
    }
}


export default badgeReducer
