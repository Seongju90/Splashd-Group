import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateBadge } from "../../store/badge";
// import b1 from '../../assets/badgeicons/a1.png'
// import b2 from '../../assets/badgeicons/a2.png'
// import b3 from '../../assets/badgeicons/a3.png'
// import b4 from '../../assets/badgeicons/a4.png'
// import b5 from '../../assets/badgeicons/a5.png'
// import b6 from '../../assets/badgeicons/a6.png'
// import b7 from '../../assets/badgeicons/a7.png'
// import b8 from '../../assets/badgeicons/a8.png'
// import b9 from '../../assets/badgeicons/a9.png'
import { thunkMyBrewery } from "../../store/brewery";
// todo: edit form for new badges
export default function BadgeFormModal({id}) {
    const dispatch = useDispatch();
    const [icon, setIcon] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal();
    const userId = useSelector(state => state.session?.user?.id)
    // const { id } = useParams()
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await dispatch(thunkCreateBadge(
            {
                'icon': icon,
                'description': description
            }, id
        ));

        if (data) {
            setErrors(data.errors);
        } else {
            dispatch(thunkMyBrewery(userId))
            closeModal();
        }
    };
    // const options = [b1, b2, b3]
    return (
        <div className="modal-whole">
            <div className="modal-header">
                <div className="modal-title">Make A Badge!</div>
                <div className="error-cont">
                    {errors.map((error) => (
                        <div classname='error-message'>{error}</div>
                    ))}
                </div>
                <div className="modal-exit" onClick={() => closeModal()}>X</div>
            </div>
            <form id='modal-form' className="modal-form"
                onSubmit={handleSubmit}>
                <div>
                    Icon
                </div>
                <input
                    type="url"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    placeholder='URL'
                    required
                />
                <div>
                    Description
                </div>
                <input
                    type="text"
                    placeholder='Describe your beer...'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <div>
                    <button type="submit" id="modal-submit">Create</button>
                </div>
            </form>
        </div>
    )
}
