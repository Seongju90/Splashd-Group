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
			<form id='modal-form' className="modal-form"
				onSubmit={handleSubmit}>
				<div>
					Email
				</div>
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					placeholder='jane@app.io'

				/>
				<div>
					Username
				</div>
				<input
				            placeholder="SweetJane33"

					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<div>
					First Name
				</div>
				<input
					type="text"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
					placeholder="Jane"
				/>
				<div>
					Last Name
				</div>
				<input
					type="text"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					required
				 placeholder="Smith"

				/>
				<div>
					Age
				</div>
				<input
					type="number"
					value={age}
					onChange={(e) => setAge(e.target.value)}
					min="0"
					placeholder="22"

					required

				/>
				<div>
					Profile Picture
				</div>
				<input
					type="url"
					value={propic}
					onChange={(e) => setPropic(e.target.value)}
					placeholder="optional"
				/>
				<div>
					Password
				</div>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					min='6'
					required
					placeholder='AgO0dPasWorD'

				/>
				<div>
					Confirm Password
				</div>
				<input
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
					placeholder="must match"

				/>
				<div>
					<button type="submit" id="modal-submit">Sign Up</button>
				</div>
			</form>
		</div >
	);
}

export default SignupFormModal;
