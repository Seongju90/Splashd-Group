import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkEditBeer, thunkRemoveBeer } from "../../store/beer";
import { thunkOneBrewery } from "../../store/brewery";
import { useHistory } from "react-router-dom";


export default function EditBeerModal({beer}) {
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
    const history = useHistory()
    const brewery = useSelector(state => state.brewery.onebrewery)
    // console.log(id)
    const handleSubmit = async (e) => {
        e.preventDefault();

        let ab = Number((+abv).toFixed(2))

        const beerdata = {
            'name': name,
            'abv': ab,
            'ibu': +ibu,
            'type': type,
            // 'brewery_id': id,
            'beer_logo': logo,
            'description': description
        }
        // console.log(beerdata)
        const data = await dispatch(thunkEditBeer(
            // {
            //     'name': name,
            //     'abv': +abv,
            //     'ibu': +ibu,
            //     'type': type,
            //     // 'brewery_id': id,
            //     'beer_logo': logo,
            //     'description': description
            // },
            beerdata,
            beer.brewery_id, beer.id
        ));
        if (data) {
            setErrors(data.errors);
        } else {
            // history.push('/') comment in when onebeer componant is added
            // get exact url path form app.js
            dispatch(thunkOneBrewery(brewery.id))
            closeModal();
        }
    };
    const handleDelete = async (e) => {
        e.preventDefault();


        const data = await dispatch(thunkRemoveBeer(beer.id))


        if (data) {
            setErrors(data.errors);
        } else {
            dispatch(thunkOneBrewery(brewery.id))
            closeModal();
        }
    };

    return (
        <div className="modal-whole">
        <div className="modal-header">
                <div className="modal-exit"
                    onClick={() => closeModal()}
                >X</div>
            <div className="modal-title">Change Your Beer!</div>
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
                        pattern='[a-z,A-Z]+'
                        title="No special characters or numbers"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    ABV
                    <input
                        type="decimal"
                        value={abv}
                        min='3.0'
                        max='13.0'
                        onChange={(e) => setAbv(e.target.value)}
                        required
                    />
                </label>
                <label>
                    IBU
                    <input
                        type="number"
                        value={ibu}
                        min='5'
                        max='100'
                        onChange={(e) => setIbu(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Type
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
                </label>
                <label>
                    description
                    <input
                        type="textarea"
                        value={description}
                        minLength='5'
                        maxLength='2000'
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Logo
                    <input
                        type="url"
                        value={logo}
                        onChange={(e) => setLogo(e.target.value)}
                        required
                    />
                </label>
                <>
                <button type="submit">Edit a Beer</button>
                </>
                <>
                <button type="button"
                onClick={handleDelete}
                >Delete Beer</button>
                </>
            </form>
        </div>
    )
}
