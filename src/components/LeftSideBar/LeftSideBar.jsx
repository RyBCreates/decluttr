import { NavLink } from "react-router-dom";
import logo from "../../assets/logo/decluttr-logo.svg";
import "./LeftSideBar.css";

function LeftSideBar() {
  return (
    <div className="left-sidebar">
      <img className="left-sidebar__logo" src={logo} alt="Decluttr logo"></img>
      <nav className="left-sidebar__container" aria-label="Main navigation">
        <NavLink className="left-sidebar__link" to="/">
          <span className="left-sidebar__link-emoji">🏠</span> Home
        </NavLink>
        <NavLink className="left-sidebar__link" to="profile">
          <span className="left-sidebar__link-emoji">🧑🏿</span> Profile
        </NavLink>
        <NavLink className="left-sidebar__link" to="shop">
          <span className="left-sidebar__link-emoji">🛒</span> Shop
        </NavLink>
      </nav>
    </div>
  );
}

export default LeftSideBar;
