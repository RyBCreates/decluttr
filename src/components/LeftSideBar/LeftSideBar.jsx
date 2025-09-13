import logo from "../../assets/logo/decluttr-logo.svg";
import "./LeftSideBar.css";

function LeftSideBar() {
  return (
    <div className="left-sidebar">
      <img className="left-sidebar__logo" src={logo}></img>
      <div className="left-sidebar__container">
        <button className="left-sidebar__link">🏠 Home</button>
        <button className="left-sidebar__link">🧑🏿 Profile</button>
        <button className="left-sidebar__link">🛒 Shop</button>
      </div>
    </div>
  );
}

export default LeftSideBar;
