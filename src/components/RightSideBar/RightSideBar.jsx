import "./RightSideBar.css";

function RightSideBar() {
  return (
    <div className="right-sidebar">
      <ul className="right-sidebar__stats">
        <li className="right-sidebar__stat">
          <p className="right-sidebar__streak">🔥 364</p>
        </li>
        <li className="right-sidebar__stat">
          <p className="right-sidebar__gems">💎 999</p>
        </li>
        <li className="right-sidebar__stat">
          <p className="right-sidebar__experience">🌟 10</p>
        </li>
      </ul>
    </div>
  );
}

export default RightSideBar;
