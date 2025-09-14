import "./LoginModal.css";
import "../Modals.css";
import { useEffect, useState } from "react";

function LoginModal({
  activeModal,
  handleSwitchModal,
  closeModal,
  setCurrentUser,
  setIsLoggedIn,
  users,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const formIsValid = username.trim() !== "" && password.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!foundUser) {
      setError("Invalid username or password.");
      return;
    }
    setCurrentUser(foundUser);
    setIsLoggedIn(true);
    setError("");
    closeModal();
  };

  useEffect(() => {
    if (activeModal === "login") {
      setUsername("");
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
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
