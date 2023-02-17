import { actionOneReview } from "./review";


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
	// console.log(brewery, 'tthis is the action')
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
	// console.log(brewery, 'tthis is the action')
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
	console.log(form)
	const response = await fetch(`/api/brewery/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(form)
	})
	// console.log(response, 'this is respond from backend')
	if (response.ok) {
		const data = await response.json();
		// console.log(data, '!!just came from backend')
		dispatch(addBrewery(data));
		return null
	}
	else if (response.status < 500) {
		const data = await response.json();
		// console.log(data, 'ERROR STUFF')
		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}


export const thunkDeleteBrewery = (id) => async (dispatch) => {
	const response = await fetch(`/api/brewery/${id}`, {
		method: 'DELETE',
		headers: { "Content-Type": "application/json" },
	})
	// console.log(response, 'this is respond from backend')
	if (response.ok) {
		const data = await response.json();
		// console.log(data, '!!just came from backend')
		// console.log('%$%!$#%!$#%!$#%!$#%!$#%!$#%', data)
		dispatch(deleteBrewery(id));

		return null
	}
	else if (response.status < 500) {
		const data = await response.json();
		// console.log(data)
		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}


export const thunkOneBrewery = (id) => async (dispatch) => {
	const response = await fetch(`/api/brewery/${id}`, {
		headers: { "Content-Type": "application/json" },
	})
	// console.log(response, 'this is respond from backend')
	if (response.ok) {
		const data = await response.json();
		// console.log(data, '!!just came from backend')
		// console.log('%$%!$#%!$#%!$#%!$#%!$#%!$#%', data)
		dispatch(oneBrewery(data));

		return null
	}
	else if (response.status < 500) {
		const data = await response.json();
		// console.log(data)
		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}

export const thunkAllBrewery = () => async (dispatch) => {
	const response = await fetch('/api/brewery/all', {
		headers: { "Content-Type": "application/json" },
	})
	// console.log(response)
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
	// console.log(form)
	const response = await fetch('/api/brewery', {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(form)
	})
	// console.log(response, 'this is respond from backend')
	if (response.ok) {
		const data = await response.json();
		// console.log(data, '!!just came from backend')
		dispatch(addBrewery(data));
		return null
	}
	else if (response.status < 500) {
		const data = await response.json();
		// console.log(data, 'ERROR STUFF')
		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}

export const thunkMyBrewery = (id) => async (dispatch) => {
	const response = await fetch(`/api/users/${id}/brewery`, {
		headers: { "Content-Type": "application/json" },
	})
	if (response.ok) {
		console.log("in my THUNKKKKKKKKKK")
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
			// console.log(one, 'this is the reducer')
			newState.onebrewery = one
			return newState
		case ADD_BREWERY:
			let add = action.brewery
			// console.log(add, 'this is the reducer')
			newState[add.id] = add
			return newState
		case DELETE_BREWERY:
			delete newState[action.id]
			newState.mybreweries = newState.mybreweries.filter(x => x.id !== action.id)
			return newState
		case MY_BREWERY:
			let my = action.brewery.Breweries
			newState['mybreweries'] = my
			console.log('ajsdbwbfkjbqwkfjw', my)
			return newState
		default:
			return state;
	}

}






