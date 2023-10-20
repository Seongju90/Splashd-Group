import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkEditBeer, thunkRemoveBeer } from "../../store/beer";
import { thunkMyBrewery } from "../../store/brewery";
// import { useHistory } from "react-router-dom";


export default function EditBeerModal({ beer }) {
    const dispatch = useDispatch();
    // const [beer, setBeer] = useState(useSelector((state) => state.beer.onebeer))
    const [name, setName] = useState(beer.name);
    const [abv, setAbv] = useState(beer.abv);
    const [ibu, setIbu] = useState(beer.ibu);
    const [type, setType] = useState(beer.type);
    const [description, setDescription] = useState(beer.description);
    const [logo, setLogo] = useState(beer.beer_logo);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    // const history = useHistory()
    // const brewery = useSelector(state => state.brewery.onebrewery)
    const user = useSelector(state => state.session.user)

    const handleSubmit = async (e) => {
        e.preventDefault();

        let ab = Number((+abv).toFixed(2))

        const beerdata = {
            'name': name,
            'abv': ab,
            'ibu': +ibu,
            'type': type,
            'beer_logo': logo,
            'description': description
        }
        const data = await dispatch(thunkEditBeer(
            beerdata,
            beer.brewery_id, beer.id
        ));
        if (data) {
            setErrors(data.errors);
        } else {
            dispatch(thunkMyBrewery(user.id))
            closeModal();
        }
    };
    const handleDelete = async (e) => {
        e.preventDefault();
        const data = await dispatch(thunkRemoveBeer(beer.id))
        if (data) {
            setErrors(data.errors);
        } else {
            dispatch(thunkMyBrewery(user?.id))
            closeModal();
        }
    };

    return (
        <div className="modal-whole">
            <div className="modal-header">
                <div className="modal-title">
                    Change Your Beer!
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
            <form id='modal-form' className="modal-form"
                onSubmit={handleSubmit}>
                <div>
                    name
                </div>
                <input
                    type="text"
                    // placeholder='Jane Smith'
                    value={name}
                    pattern='[a-z,A-Z,\s]+'
                    title="No special characters or numbers"
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <div>
                    ABV
                </div>
                <input
                    type="decimal"
                    // placeholder='7.5'
                    value={abv}
                    min='3.0'
                    max='13.0'
                    onChange={(e) => setAbv(e.target.value)}
                    required
                />
                <div>
                    IBU
                </div>
                <input
                    type="number"
                    value={ibu}
                    min='5'
                    max='100'
                    onChange={(e) => setIbu(e.target.value)}
                    required
                />
                <div>
                    Type
                </div>
                <select
                    onChange={(e) => setType(e.target.value)}
                    required
                >
                    <option
                        value='Pilsner'>
                        Pilsner
                    </option>
                    <option
                        value='Stout'>
                        Stout
                    </option>

                    <option
                        value="Lager"
                    >
                        Lager
                    </option>
                    <option
                        value='IPA'
                    >
                        IPA
                    </option>
                    <option
                        value='Porter'
                    >
                        Porter
                    </option>
                    <option
                        value='Pale Ale'
                    >
                        Pale Ale
                    </option>
                    <option
                        value='Belgian'
                    >
                        Belgian
                    </option>
                    <option
                        value='Wheat Beer'
                    >
                        Wheat Beer
                    </option> <option
                        value='amurican'
                    >
                        amurican
                    </option>
                </select>
                <div>
                    description
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
                    value={logo}
                    onChange={(e) => setLogo(e.target.value)}
                    required
                />
                <div>
                    <button type="submit" id="modal-submit">Edit</button>
                </div>
                <div>
                    <button type="button" id='delete-button' onClick={handleDelete}>Delete</button>
                </div>
            </form>
        </div>
    )
}
