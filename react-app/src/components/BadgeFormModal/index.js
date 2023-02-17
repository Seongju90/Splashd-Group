import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateBadge } from "../../store/badge";
import b1 from '../../assets/badgeicons/a1.png'
import b2 from '../../assets/badgeicons/a2.png'
import b3 from '../../assets/badgeicons/a3.png'
import b4 from '../../assets/badgeicons/a4.png'
import b5 from '../../assets/badgeicons/a5.png'
import b6 from '../../assets/badgeicons/a6.png'
import b7 from '../../assets/badgeicons/a7.png'
import b8 from '../../assets/badgeicons/a8.png'
import b9 from '../../assets/badgeicons/a9.png'
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
    const options = [b1, b2, b3]
    return (
        <div className="modal-whole">
            <div className="modal-header">
                <div className="modal-title">Make A Badge!</div>
                <div className="error-cont">
                    {errors.map((error) => (
                        <div classname='error-message'>{error}</div>
                    ))}
                </div>
                <div className="modal-exit">X</div>
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
                    <select
                        // type="select"
                        value={icon}
                        onChange={(e) => setIcon(e.target.value)}
                        required
                        options={options}
                    >
                    </select>
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
