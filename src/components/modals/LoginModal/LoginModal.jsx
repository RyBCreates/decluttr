import { useEffect, useState } from "react";

import "./LoginModal.css";
import "../Modals.css";

import { useCurrentUser } from "../../../contexts/UserContext";
import { loginUser } from "../../../utils/api/auth";

function LoginModal({ activeModal, handleSwitchModal, closeModal }) {
  const { setUser } = useCurrentUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const formIsValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      setUser(data.user);
      closeModal();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (activeModal === "login") {
      setEmail("");
      setPassword("");
      setError("");
    }
  }, [activeModal]);

  return (
    <div
      className={`login modal ${
        activeModal === "login" ? "modal__opened" : ""
      }`}
    >
      <div className="login__content">
        <h2 className="login__title">Log In</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            className="login__input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login__input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="login__error">{error}</p>}
          <button
            className="login__submit"
            type="submit"
            disabled={!formIsValid}
          >
            Log In
          </button>
          <button
            className="login__switch"
            type="button"
            onClick={handleSwitchModal}
          >
            or Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
