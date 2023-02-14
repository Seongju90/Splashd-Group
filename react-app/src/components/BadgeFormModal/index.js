import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateBadge } from "../../store/badge";

// todo: edit form for new badges
export default function BadgeFormModal() {
    const dispatch = useDispatch();

    const [icon, setIcon] = useState("");
    const [description, setDescription] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await dispatch(thunkCreateBadge(
            {
                'icon': icon,
                'description': description
            }, 1
        ));

        // if (data) {
        //     setErrors(data.errors);
        // } else {
        //     closeModal();
        // }
    };

    return (
        <>
            <h1>Create a Badge</h1>
            <form onSubmit={handleSubmit}>
                {/* <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul> */}
                <label>
                    Icon
                    <input
                        type="text"
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
        </>
    )
}
