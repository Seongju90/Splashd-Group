import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateBadge } from "../../store/brewery";

// todo: edit form for new badges
export default function BreweryFormModal() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [breweryType, setBreweryType] = useState("");
    const [breweryLogo, setBreweryLogo] = useState("");
    const [cityState, setCityState] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('name', name,
            'brewery_type', breweryType,
            'brewery_logo', breweryLogo,
            'city_state', cityState)
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
            closeModal();
        }
    };

    return (
        <>
            <h1>Create</h1>
            <form onSubmit={handleSubmit}>
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
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Location (city and state)
                    <input
                        type="text"
                        value={cityState}
                        onChange={(e) => setCityState(e.target.value)}
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
                            value='Regional Brewery'
                        >
                            Regional
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
        </>
    )
}
