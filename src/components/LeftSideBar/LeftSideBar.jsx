import { NavLink } from "react-router-dom";
import logo from "../../assets/logo/decluttr-logo.svg";
import "./LeftSideBar.css";

function LeftSideBar({
  isLoggedIn,
  handleLogoutClick,
  handleLoginClick,
  handleRegisterClick,
}) {
  return (
    <div className="left-sidebar">
      <nav className="left-sidebar__container" aria-label="Main navigation">
        <NavLink to="/">
          <img
            className="left-sidebar__logo"
            src={logo}
            alt="Decluttr logo"
          ></img>
        </NavLink>
        <NavLink className="left-sidebar__link" to="/">
          <span className="left-sidebar__link-emoji">🏠</span> Home
        </NavLink>
        <NavLink className="left-sidebar__link" to="profile">
          <span className="left-sidebar__link-emoji">🧑🏿</span> Profile
        </NavLink>
        <NavLink className="left-sidebar__link" to="shop">
          <span className="left-sidebar__link-emoji">🛒</span> Shop
        </NavLink>
        <NavLink className="left-sidebar__link" to="quiz">
          <span className="left-sidebar__link-emoji">💯</span> Quiz
        </NavLink>
      </nav>
      {isLoggedIn ? (
        <button
          className="left-sidebar__logout"
          onClick={() => {
            handleLogoutClick();
          }}
        >
          Log Out
        </button>
      ) : (
        <div className="left-sidebar__auth-buttons">
          <button
            className="left-sidebar__login"
            onClick={() => {
              handleLoginClick();
            }}
          >
            Log In
          </button>
          <button
            className="left-sidebar__register"
            onClick={() => {
              handleRegisterClick();
            }}
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
}

export default LeftSideBar;
