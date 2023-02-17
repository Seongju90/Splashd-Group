import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [propic, setPropic] = useState(null);

	const [age, setAge] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, firstName, lastName, age, password, propic));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Password's must Match'",
			]);
		}
	};

	return (
		<div className="modal-whole">
			<div className="modal-header">
				<div className="modal-title">
					Sign-Up
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

				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					First Name
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				<label>
					Last Name
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
				<label>
					Age
					<input
						type="number"
						value={age}
						onChange={(e) => setAge(e.target.value)}
						min="0"
						required
						
					/>
				</label>
				<div>
					Profile Picture
				</div>
				<input
                    type="url"
                    value={propic}
                    onChange={(e) => setPropic(e.target.value)}
                    required
					placeholder="optional"
                />
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Sign Up</button>
			</form>
		</div >
	);
}

export default SignupFormModal;
