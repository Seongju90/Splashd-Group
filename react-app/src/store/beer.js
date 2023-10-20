import { thunkMyBrewery, } from "./brewery";
import { actionOneReview } from "./review";

const ALL_BEERS = "beer/ALL_BEERS";
const REMOVE_BEER = "beer/REMOVE_BEER";
const ONE_BEER = "beer/ONE_BEER"
const ADD_BEER = "beer/ADD_BEER"

const allBeer = (beer) => {

	return {
		type: ALL_BEERS,
		beer,
	}
}
const oneBeer = (beer) => {

	return {
		type: ONE_BEER,
		beer,
	}
};
const removeBeer = (id) => ({
	type: REMOVE_BEER,
	id
});
const addBeer = (beer) => {

	return {
		type: ADD_BEER,
		beer,
	}
};
///// ///// ////////// ///// ////////// ///// ////////// ///// ////////// ///// //////////

export const thunkAllBeer = () => async (dispatch) => {
	const response = await fetch('/api/beer/all', {
		headers: { "Content-Type": "application/json" },
	})

	if (response.ok) {
		const data = await response.json();
		dispatch(allBeer(data));
		return response
	}
	else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}



export const thunkOneBeer = (id) => async (dispatch) => {
	const response = await fetch(`/api/beer/${id}`, {
		headers: { "Content-Type": "application/json" },
	})

	if (response.ok) {
		const data = await response.json();

		dispatch(oneBeer(data));
		data.reviews.forEach(async (x) => {

			await dispatch(actionOneReview(x))
		})
		return null
		// return response
	}
	else if (response.status < 500) {
		const data = await response.json();

		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}



export const thunkCreateBeer = (form, id) => async (dispatch) => {
	const response = await fetch(`/api/brewery/${id}/beers`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(form)
	})
	if (response.ok) {
		const data = await response.json();
		await dispatch(thunkMyBrewery(data.id))
		dispatch(addBeer(data.beer));
		return null
	}
	else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}

export const thunkEditBeer = (form, breweryId, beerId) => async (dispatch) => {
	const response = await fetch(`/api/brewery/${breweryId}/beers/${beerId}/`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(form)
	})

	if (response.ok) {
		const data = await response.json();

		dispatch(addBeer(data));
		return null
	}
	else if (response.status < 500) {
		const data = await response.json();

		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}

export const thunkRemoveBeer = (id) => async (dispatch) => {
	const response = await fetch(`/api/beer/${id}/`, {
		method: 'DELETE'
	})
	if (response.ok) {
		dispatch(removeBeer(id));
		return null
	}
	else if (response.status < 500) {
		const data = await response.json();

		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}

///// ///// ////////// ///// ////////// ///// ////////// ///// ////////// ///// ////////// ///// /////

const initialState = {}
export default function reducer(state = initialState, action) {
	let newState = { ...state }
	switch (action.type) {
		case ALL_BEERS:
			let all = action.beer

			for (let b of all.beers) newState[b.id] = b
			return newState;
		case ONE_BEER:
			let one = action.beer

			newState.onebeer = one
			return newState
		case ADD_BEER:
			let add = action.beer

			newState[add.id] = add
			newState[add.id] ? newState[add.id] = add : newState[add.id] = add
			// newState.onespot ? newState.onespot[spot.id] = spot : newState.onespot = { [spot.id]: spot }
			return newState
		case REMOVE_BEER:
			delete newState[action.id]
			return newState
		default:
			return state;
	}
}
