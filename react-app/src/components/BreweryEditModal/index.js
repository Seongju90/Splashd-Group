import React, { useState , useSelector} from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkEditBrewery, thunkMyBrewery } from "../../store/brewery";


export default function BreweryEditModal({ brew, id }) {
    const dispatch = useDispatch();
    const [name, setName] = useState(brew?.name);
    const [breweryType, setBreweryType] = useState(brew?.brewery_type);
    const [breweryLogo, setBreweryLogo] = useState(brew?.brewery_logo);
    const [city, setCity] = useState(brew?.city_state.split(',')[0]);
    const [states, setStates] = useState(brew?.city_state.slice(-2))
    const [description, setDescription] = useState(brew?.description);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cityState = city + ", " + states
        const data = await dispatch(thunkEditBrewery(
            {
                'name': name,
                'brewery_type': breweryType,
                'brewery_logo': breweryLogo,
                'city_state': cityState,
                'description': description
            }, brew?.id
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
                <div className="modal-title">
                    Edit Brewery
                </div>
                <div className="error-cont">
                    {errors.map((error) => (
                        <div classname='error-message'>{error}</div>
                    ))}
                </div>
                <div className="modal-exit"
                    onClick={() => closeModal()}
                >
                    X
                </div>
            </div>
            <form className="modal-form"
                onSubmit={handleSubmit}>
                <div>
                    Name
                </div>
                    <input
                        type="text"
                        value={name}
                        minLength='2'
                        maxLength='255'
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                <div>
                    City
                </div>
                    <input
                        type="text"
                        pattern='[a-z,A-Z,\s]+'
                        title="City must only be in alphabetical letters"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                <div>
                    State
                </div>
                    <input
                        type="text"
                        value={states}
                        maxLength='2'
                        pattern='^[A-Z]{2}$'
                        title="State must be 2 capital letter"
                        onChange={(e) => setStates(e.target.value)}
                        required
                    />
                <div>
                    Type
                </div>
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
                    </select>
                <div>
                    Description
                </div>
                <input
                    type="textarea"
                    value={description}
                    minLength='5'
                    maxLength='2000'
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <div>
                    Logo
                </div>
                    <input
                        type="url"
                        value={breweryLogo}
                        onChange={(e) => setBreweryLogo(e.target.value)}
                        required
                    />
                <div>
                    <button type="submit">Edit</button>
                </div>
            </form>
        </div>
    )
}
