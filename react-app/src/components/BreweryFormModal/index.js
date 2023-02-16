import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateBrewery, thunkMyBrewery } from "../../store/brewery";


export default function BreweryFormModal({id}) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [breweryType, setBreweryType] = useState("Regional Brewery");
    const [breweryLogo, setBreweryLogo] = useState("");
    const [city, setCity] = useState("");
    const [states, setStates] = useState("")
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('name', name,
        //     'brewery_type', breweryType,
        //     'brewery_logo', breweryLogo,
        //     'city_state', cityState)

        const cityState = city + ", " + states

        const data = await dispatch(thunkCreateBrewery(
            {
                'name': name,
                'brewery_type': breweryType,
                'brewery_logo': breweryLogo,
                'city_state': cityState
            }
        ));
        if (data) {
            setErrors(data.errors);
        } else {
            await dispatch(thunkMyBrewery(id))
            closeModal();
        }
    };

    return (
        <div className="modal-whole">
			<div className="modal-header">
				<div className="modal-exit">X</div>
				<div className="modal-title">Make Your Brewery!</div>
			</div>
			<form className="modal-form" 
            onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    name
                    <input
                        type="text"
                        value={name}
                        minLength='2'
                        maxLength='255'
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    City
                    <input
                        type="text"
                        pattern='[a-z,A-Z,\s]+'
                        title="City must only be in alphabetical letters"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
                <label>
                    State
                    <input
                        type="text"
                        value={states}
                        maxLength='2'
                        pattern='^[A-Z]{2}$'
                        title="State must be 2 capital letter"
                        onChange={(e) => setStates(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Type
                    <select
                        onChange={(e) => setBreweryType(e.target.value)}
                        required
                    >
                        <option
                            value='Regional Brewery'>
                            Regional
                        </option>
                        <option
                            value='Macro Brewery'>
                            Macro
                        </option>

                        <option
                            value="International Brewery"
                        >
                            Int
                        </option>
                        <option
                            value='Error Please'
                        >
                            Error
                        </option>
                    </select>
                </label>
                <label>
                    Logo
                    <input
                        type="url"
                        value={breweryLogo}
                        onChange={(e) => setBreweryLogo(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Create</button>

            </form>
        </div>
    )
}
