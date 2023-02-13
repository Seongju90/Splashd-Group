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
	// console.log(beer, 'tthis is the action')
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
	// console.log(beer, 'tthis is the action')
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
	// console.log(response)
	if (response.ok) {
		const data = await response.json();
		dispatch(allBeer(data));
		return response
	}
	else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) return data;
	}
	else return { errors: "An error occurred. Please try again." }
}



export const thunkOneBeer = (id) => async (dispatch) => {
	const response = await fetch(`/api/beer/${id}`, {
		headers: { "Content-Type": "application/json" },
	})
	// console.log(response, 'this is respond from backend')
	if (response.ok) {
		const data = await response.json();
		// console.log(data, '!!just came from backend')
		dispatch(oneBeer(data));
		return response
	}
	else if (response.status < 500) {
		const data = await response.json();
		// console.log(data)
		if (data.errors) return data;
	}
	else return { errors: "An error occurred. Please try again." }
}



export const thunkCreateBeer = (form, id) => async (dispatch) => {
	// console.log(form)
	const response = await fetch(`/api/brewery/${id}/beers`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(form)
	})
	// console.log(response, 'this is respond from backend')
	if (response.ok) {
		const data = await response.json();
		// console.log(data, '!!just came from backend')
		dispatch(addBeer(data));
		return null
	}
	else if (response.status < 500) {
		const data = await response.json();
		// console.log(data, 'ERROR STUFF')
		if (data.errors) return data;
	}
	else return { errors: "An error occurred. Please try again." }
}

export const thunkEditBeer = ( form , breweryId, beerId) => async (dispatch) => {
	console.log(form)
	const response = await fetch(`/api/brewery/${breweryId}/beers/${beerId}/`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(form)
	})
	// console.log(response, 'this is respond from backend')
	if (response.ok) {
		const data = await response.json();
		// console.log(data, '!!just came from backend')
		dispatch(addBeer(data));
		return null
	}
	else if (response.status < 500) {
		const data = await response.json();
		// console.log(data, 'ERROR STUFF')
		if (data.errors) return data;
	}
	else return { errors: "An error occurred. Please try again." }
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
		// console.log(data, 'ERROR STUFF')
		if (data.errors) return data;
	}
	else return { errors: "An error occurred. Please try again." }
}

///// ///// ////////// ///// ////////// ///// ////////// ///// ////////// ///// ////////// ///// /////

const initialState = {}
export default function reducer(state = initialState, action) {
	let newState = { ...state }
	switch (action.type) {
		case ALL_BEERS:
			let all = action.beer
            // console.log(all)
			for (let b of all.beers) newState[b.id] = b
			return newState;
		case ONE_BEER:
			let one = action.beer
			// console.log(one, 'this is the reducer')
			newState.onebeer = one
			return newState
		case ADD_BEER:
			let add = action.beer
			// console.log(add, 'this is the reducer')
			newState[add.id]=add
            newState[add.id] ?  newState[add.id] = add : newState[add.id] = add
            // newState.onespot ? newState.onespot[spot.id] = spot : newState.onespot = { [spot.id]: spot }
			return newState
		case REMOVE_BEER:
			delete newState[action.id]
			return newState
		default:
			return state;
	}
}
