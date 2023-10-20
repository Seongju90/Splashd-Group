
/* ---------- TYPE VARIABLES ---------- */
const ALL_BREWERIES = "brewery/ALL_BREWERIES";
const DELETE_BREWERY = "brewery/DELETE_BREWERY";
const ONE_BREWERY = "brewery/ONE_BREWERY"
const ADD_BREWERY = "brewery/ADD_BREWERY"
const MY_BREWERY = "brewery/MY_BREWERY"

/* ---------- ACTION CREATORS ---------- */
const allBrewery = (breweries) => {

	return {
		type: ALL_BREWERIES,
		breweries,
	}
}
const oneBrewery = (brewery) => {

	return {
		type: ONE_BREWERY,
		brewery,
	}
};
const deleteBrewery = (id) => ({
	type: DELETE_BREWERY,
	id
});
const addBrewery = (brewery) => {

	return {
		type: ADD_BREWERY,
		brewery,
	}
};
const myBrewery = (brewery) => {
	return {
		type: MY_BREWERY,
		brewery,
	}
}

/* ---------- THUNK ACTION CREATORS ---------- */
export const thunkEditBrewery = (form, id) => async (dispatch) => {
	const response = await fetch(`/api/brewery/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(form)
	})

	if (response.ok) {
		const data = await response.json();

		dispatch(addBrewery(data));
		return null
	}
	else if (response.status < 500) {
		const data = await response.json();

		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}


export const thunkDeleteBrewery = (id) => async (dispatch) => {
	const response = await fetch(`/api/brewery/${id}`, {
		method: 'DELETE',
		headers: { "Content-Type": "application/json" },
	})

	if (response.ok) {
		dispatch(deleteBrewery(id));

		return null
	}
	else if (response.status < 500) {
		const data = await response.json();

		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}


export const thunkOneBrewery = (id) => async (dispatch) => {
	const response = await fetch(`/api/brewery/${id}`, {
		headers: { "Content-Type": "application/json" },
	})

	if (response.ok) {
		const data = await response.json();


		dispatch(oneBrewery(data));

		return null
	}
	else if (response.status < 500) {
		const data = await response.json();

		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}

export const thunkAllBrewery = () => async (dispatch) => {
	const response = await fetch('/api/brewery/all', {
		headers: { "Content-Type": "application/json" },
	})

	if (response.ok) {
		const data = await response.json();
		dispatch(allBrewery(data));
		return response
	}
	else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}

export const thunkCreateBrewery = (form) => async (dispatch) => {

	const response = await fetch('/api/brewery', {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(form)
	})

	if (response.ok) {
		const data = await response.json();

		dispatch(addBrewery(data));
		return null
	}
	else if (response.status < 500) {
		const data = await response.json();

		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}

export const thunkMyBrewery = (id) => async (dispatch) => {
	const response = await fetch(`/api/users/${id}/brewery`, {
		headers: { "Content-Type": "application/json" },
	})
	if (response.ok) {
		const data = await response.json();
		dispatch(myBrewery(data));
		return null
	}
	else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}
// export async function thunkDeleteBrewery(id) {

// }

/* ---------- BREWERIES REDUCER ---------- */

const initialState = {}
export default function reducer(state = initialState, action) {
	let newState = { ...state }
	switch (action.type) {
		case ALL_BREWERIES:
			let all = action.breweries
			for (let b of all.breweries) newState[b.id] = b
			return newState;
		case ONE_BREWERY:
			let one = action.brewery

			newState.onebrewery = one
			return newState
		case ADD_BREWERY:
			let add = action.brewery

			newState[add.id] = add

			newState.mybreweries = newState.mybreweries.map(x => x.id === add.id ? x = add : x = x)

			return newState
		case DELETE_BREWERY:
			delete newState[action.id]
			newState.mybreweries = newState.mybreweries.filter(x => x.id !== add.id)
			return newState
		case MY_BREWERY:
			let my = action.brewery.Breweries
			newState['mybreweries'] = my
			return newState
		default:
			return state;
	}

}
