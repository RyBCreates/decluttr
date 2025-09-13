import logo from "../../assets/logo/decluttr-logo.svg";
import "./LeftSideBar.css";

function LeftSideBar() {
  return (
    <div className="left-sidebar">
      <img className="left-sidebar__logo" src={logo}></img>
      <div className="left-sidebar__container">
        <button className="left-sidebar__link">
          <span className="left-sidebar__link-emoji">🏠</span> Home
        </button>
        <button className="left-sidebar__link">
          <span className="left-sidebar__link-emoji">🧑🏿</span> Profile
        </button>
        <button className="left-sidebar__link">
          <span className="left-sidebar__link-emoji">🛒</span> Shop
        </button>
      </div>
    </div>
  );
}

export default LeftSideBar;
