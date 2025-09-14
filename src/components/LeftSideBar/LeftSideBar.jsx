import { NavLink } from "react-router-dom";
import logo from "../../assets/logo/decluttr-logo.svg";
import "./LeftSideBar.css";
import home from "../../assets/icons/home-icon.svg";
import profile from "../../assets/icons/profile-icon.svg";
import shop from "../../assets/icons/shop-icon.svg";
import quiz from "../../assets/icons/quiz-icon.svg";

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
          <img src={home} alt="" className="left-sidebar__icon" /> Home
        </NavLink>
        <NavLink className="left-sidebar__link" to="profile">
          <img src={profile} alt="" className="left-sidebar__icon" /> Profile
        </NavLink>
        <NavLink className="left-sidebar__link" to="shop">
          <img src={shop} alt="" className="left-sidebar__icon" /> Shop
        </NavLink>
        <NavLink className="left-sidebar__link" to="quiz">
          <img src={quiz} alt="" className="left-sidebar__icon" /> Quiz
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
