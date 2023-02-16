import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateBadge } from "../../store/badge";


// todo: edit form for new badges
export default function BadgeFormModal() {
    const dispatch = useDispatch();
    const [icon, setIcon] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal();
    const beer = useSelector(state => state.beer?.onebeer)
    // const { id } = useParams()
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await dispatch(thunkCreateBadge(
            {
                'icon': icon,
                'description': description
            }, beer?.id
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
                <div className="modal-exit">X</div>
                <div className="modal-title">Make A Badge!</div>
            </div>
            <form className="modal-form"
                onSubmit={handleSubmit}>

                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    Icon
                    <input
                        type="url"
                        value={icon}
                        onChange={(e) => setIcon(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}
