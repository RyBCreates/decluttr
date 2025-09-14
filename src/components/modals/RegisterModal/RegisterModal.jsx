import { useState, useEffect } from "react";
import "./RegisterModal.css";
import "../Modals.css";

function RegisterModal({ activeModal, closeModal, handleSwitchModal }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifiedPassword, setVerifiedPassword] = useState("");

  useEffect(() => {
    if (activeModal === "register") {
      setUsername("Test User");
      setEmail("test@test.com");
      setPassword("1234");
      setVerifiedPassword("1234");
    }
  }, [activeModal]);

  const formIsValid =
    username.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    verifiedPassword.trim() !== "" &&
    password === verifiedPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formIsValid) return;
    closeModal();
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
          <button className="register__submit" disabled={!formIsValid}>
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
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;
