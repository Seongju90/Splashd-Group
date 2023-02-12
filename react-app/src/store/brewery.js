const ALL_BREWERIES = "brewery/ALL_BREWERIES";
const REMOVE_BREWERY = "brewery/REMOVE_BREWERY";
const ONE_BREWERY = "brewery/ONE_BREWERY"


const allBrewery = (breweries) => ({
	type: ALL_BREWERIES,
	breweries,
});
const oneBrewery = (brewery) => ({
	type: ONE_BREWERY,
	brewery,
});
const removeBrewery = (id) => ({
	type: REMOVE_BREWERY,
	id
});


export const thunkOneBrewery = (id) => async (dispatch) => {
	const response = await fetch(`/api/brewery/${id}`, {
		headers: { "Content-Type": "application/json" },
	})
	console.log(response)
	if (response.ok) {
		const data = await response.json();
		console.log(data)
		dispatch(oneBrewery(data));
		return response
	}
	else if (response.status < 500) {
		const data = await response.json();
		console.log(data)
		if (data.errors) return data;
	}
	else return { errors: "An error occurred. Please try again." }
}

export const thunkAllBrewery = () => async (dispatch) => {
	const response = await fetch('/api/brewery', {
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
			for (let b of all.breweries) newState[b.id]= b
			return newState;
		case ONE_BREWERY:
			let one = action.brewery.brewery
			// console.log(one)
			newState.onebrewery = one
			return newState
		case REMOVE_BREWERY:
			delete newState[action.id]
			return newState
		default:
			return state;
	}
}






