import { useState, useEffect } from "react";
import "./RegisterModal.css";
import "../Modals.css";

import { useCurrentUser } from "../../../contexts/UserContext";
import { registerUser } from "../../../utils/api/auth";

function RegisterModal({ activeModal, closeModal, handleSwitchModal }) {
  const { setUser } = useCurrentUser();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifiedPassword, setVerifiedPassword] = useState("");

  useEffect(() => {
    if (activeModal === "register") {
      setUsername("");
      setEmail("");
      setPassword("");
      setVerifiedPassword("");
    }
  }, [activeModal]);

  const formIsValid =
    username.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    verifiedPassword.trim() !== "" &&
    password === verifiedPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formIsValid) return;

    try {
      const data = await registerUser({ username, email, password });
      localStorage.setItem("token", data.token);
      setUser(data.user);
      closeModal();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div
      className={`register modal ${
        activeModal === "register" ? "modal__opened" : ""
      }`}
    >
      <div className="register__content">
        <h2 className="register__title">Register</h2>
        <form
          className="register__form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            className="register__input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="register__input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="register__input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            className="register__input"
            type="password"
            placeholder="Verify Password"
            value={verifiedPassword}
            onChange={(e) => {
              setVerifiedPassword(e.target.value);
            }}
          />
          {verifiedPassword && password !== verifiedPassword && (
            <p className="register__error">Passwords do not match!</p>
          )}
          <div className="register__buttons">
            <button
              className={`register__submit ${
                !formIsValid ? "register__submit_disabled" : ""
              }`}
              disabled={!formIsValid}
            >
              Register
            </button>
            <button
              className="register__switch"
              type="button"
              onClick={() => {
                handleSwitchModal();
              }}
            >
              or Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;
