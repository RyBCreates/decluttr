import "./LoginModal.css";
import "../Modals.css";
import { useEffect, useState } from "react";

function LoginModal({ activeModal, handleSwitchModal }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const formIsValid = username.trim() !== "" && password.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password && !username) return;
    closeModal();
  };

  useEffect(() => {
    if (activeModal === "login") {
      setUsername("");
      setPassword("");
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
        <form
          className="login__form"
          onSubmit={() => {
            handleSubmit();
          }}
        >
          <input
            className="login__input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {username.trim() === "" ? (
            <p className="login__error">Please enter your Username.</p>
          ) : (
            ""
          )}
          <input
            className="login__input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
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
            onClick={() => {
              handleSwitchModal();
            }}
          >
            or Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
