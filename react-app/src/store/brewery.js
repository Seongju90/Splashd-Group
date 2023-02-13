const ALL_BREWERIES = "brewery/ALL_BREWERIES";
const REMOVE_BREWERY = "brewery/REMOVE_BREWERY";
const ONE_BREWERY = "brewery/ONE_BREWERY"
const ADD_BREWERY = "brewery/ADD_BREWERY"

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
const removeBrewery = (id) => ({
	type: REMOVE_BREWERY,
	id
});
const addBrewery = (brewery) => {
	// console.log(brewery, 'tthis is the action')
	return {
		type: ADD_BREWERY,
		brewery,
	}
};


export const thunkOneBrewery = (id) => async (dispatch) => {
	const response = await fetch(`/api/brewery/${id}`, {
		headers: { "Content-Type": "application/json" },
	})
	// console.log(response, 'this is respond from backend')
	if (response.ok) {
		const data = await response.json();
		// console.log(data, '!!just came from backend')
		dispatch(oneBrewery(data));
		return response
	}
	else if (response.status < 500) {
		const data = await response.json();
		// console.log(data)
		if (data.errors) return data;
	}
	else return { errors: "An error occurred. Please try again." }
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
	else return { errors: "An error occurred. Please try again." }
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
	else return { errors: "An error occurred. Please try again." }
}

export async function thunkDeleteBrewery(id) {

}
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
			console.log(one, 'this is the reducer')
			newState.onebrewery = one
			return newState
		case ADD_BREWERY:
			let add = action.brewery
			console.log(add, 'this is the reducer')
			newState[add.id]=add
			return newState
		case REMOVE_BREWERY:
			delete newState[action.id]
			return newState
		default:
			return state;
	}
}






