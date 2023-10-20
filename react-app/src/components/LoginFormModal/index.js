import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { useModal } from "../../context/Modal";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      history.push('/beers')
      window.alert("login successful")
      closeModal()
    }
  };

  return (
    <div className="modal-whole">
      <div className="modal-header">
        <div className="modal-title">
          Login
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
          placeholder='jane@app.io'

          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div>
          Password
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder='your password'

        />
        <div>
          <button type="submit" id="modal-submit">Log In</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
