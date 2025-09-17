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
        <NavLink className="left-sidebar__link" to="/" aria-label="Home">
          <img src={home} alt="" className="left-sidebar__icon" />
          <span className="left-sidebar__label">Home</span>
        </NavLink>
        <NavLink
          className="left-sidebar__link"
          to="profile"
          aria-label="Profile"
        >
          <img src={profile} alt="" className="left-sidebar__icon" />
          <span className="left-sidebar__label">Profile</span>
        </NavLink>
        <NavLink className="left-sidebar__link" to="shop" aria-label="Shop">
          <img src={shop} alt="" className="left-sidebar__icon" />
          <span className="left-sidebar__label">Shop</span>
        </NavLink>
        <NavLink className="left-sidebar__link" to="quiz" aria-label="Quiz">
          <img src={quiz} alt="" className="left-sidebar__icon" />
          <span className="left-sidebar__label">Quiz</span>
        </NavLink>
      </nav>

      {isLoggedIn ? (
        <button className="left-sidebar__logout" onClick={handleLogoutClick}>
          Log Out
        </button>
      ) : (
        <div className="left-sidebar__auth-buttons">
          <button className="left-sidebar__login" onClick={handleLoginClick}>
            Log In
          </button>
          <button
            className="left-sidebar__register"
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </div>
      )}

      <div className="left-sidebar__auth-mobile" aria-label="Authentication">
        {isLoggedIn ? (
          <button
            aria-label="Log Out"
            className="left-sidebar__auth-pill"
            onClick={handleLogoutClick}
            title="Log Out"
          >
            <span aria-hidden>🚪</span>
          </button>
        ) : (
          <>
            <button
              aria-label="Register"
              className="left-sidebar__auth-pill"
              onClick={handleRegisterClick}
              title="Register"
            >
              <span aria-hidden>➕</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default LeftSideBar;
