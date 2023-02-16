import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateBeer } from "../../store/beer";


export default function BeerFormModal({ id }) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [abv, setAbv] = useState("3.01");
    const [ibu, setIbu] = useState("5");
    const [type, setType] = useState('Pilsner');
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    // console.log(id)
    const handleSubmit = async (e) => {
        e.preventDefault();

        let ab = Number((+abv).toFixed(2))

        const data = await dispatch(thunkCreateBeer(
            {
                'name': name,
                'abv': +ab,
                'ibu': +ibu,
                'type': type,
                // 'brewery_id': id,
                'beer_logo': logo,
                'description': description
            }, id
        ));
        if (data) {
            setErrors(data.errors);
        } else {
            closeModal();
        }
    };

    return (
        <div className="modal-whole">
            <div className="modal-header">
                <div className="modal-title">Create A Beer</div>
                <div className="modal-exit">X</div>
            </div>
            <form className="modal-form"
                onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <div>

                    Name
                </div>
                <input
                    type="text"
                    value={name}
                    pattern='[a-z,A-Z]+'
                    title="No special characters or numbers"
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <div>
                    ABV
                </div>
                <input
                    type="decimal"
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
                    value={logo}
                    onChange={(e) => setLogo(e.target.value)}
                    required
                />

                <button type="submit">Create</button>

            </form>
        </div>
    )
}
