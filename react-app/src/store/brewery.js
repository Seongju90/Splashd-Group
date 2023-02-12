const ALL_BREWERIES = "session/ALL_BREWERIES";
const REMOVE_BREWERY = "session/REMOVE_BREWERY";

const oneBrewery = (breweries) => ({
	type: ALL_BREWERIES,
	breweries,
});

const removeBrewery = (id) => ({
	type: REMOVE_BREWERY,
	id
});


export const thunkOneBrewery = (id) => async (dispatch) => {
	const response = await fetch(`/api/brewery/${id}`, {
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ id })
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
		dispatch(oneBrewery(data));
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
			let one = action.breweries
			for (let b of one.breweries) newState[b.id]= b
			return newState;
		case REMOVE_BREWERY:
			delete newState[action.id]
			return newState
		default:
			return state;
	}
}






