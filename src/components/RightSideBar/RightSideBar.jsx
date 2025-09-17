import { useContext, useEffect, useState } from "react";
import "./RightSideBar.css";

import UserStats from "../UserStats/UserStats";
import Achievement from "../Achievement/Achievement";

import { userAchievements } from "../../utils/mockData/mockUserAchievements";
import { CurrentUserContext } from "../../contexts/UserContext";

function RightSideBar({ achievements }) {
  const { user } = useContext(CurrentUserContext);

  const [open, setOpen] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("rightSidebarOpen");
    if (saved !== null) setOpen(saved === "true");
  }, []);
  useEffect(() => {
    localStorage.setItem("rightSidebarOpen", String(open));
  }, [open]);

  return (
    <>
      <div
        className={`right-sidebar ${
          open ? "right-sidebar--open" : "right-sidebar--closed"
        }`}
      >
        <button
          type="button"
          className="right-sidebar__close"
          aria-label="Close sidebar"
          onClick={() => setOpen(false)}
          title="Close"
        >
          ✕
        </button>

        <UserStats />

        <div className="right-sidebar__achievements">
          {user
            ? achievements.map((achievement) => {
                const userProgress = userAchievements.find(
                  (ua) =>
                    ua.userId === user.id &&
                    ua.achievementId === achievement._id
                );
                return (
                  <Achievement
                    key={achievement._id}
                    achievementVariant="home"
                    achievement={achievement}
                    progress={userProgress?.progress || 0}
                    completed={userProgress?.completed || false}
                  />
                );
              })
            : null}
        </div>
      </div>

      {!open && (
        <button
          type="button"
          className="right-sidebar__handle"
          aria-label="Open sidebar"
          onClick={() => setOpen(true)}
          title="Open"
        >
          ◀
        </button>
      )}
    </>
  );
}

export default RightSideBar;
