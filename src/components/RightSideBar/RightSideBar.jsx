import { useContext, useEffect, useState } from "react";
import "./RightSideBar.css";

import UserStats from "../UserStats/UserStats";
import Achievement from "../Achievement/Achievement";

import { CurrentUserContext } from "../../contexts/UserContext";

import { useLocalStorageState } from "../../hooks/useLocalStorageState";

function RightSideBar({ achievements, userAchievements = [] }) {
  const { user } = useContext(CurrentUserContext);
  const [open, setOpen] = useLocalStorageState("rightSidebarOpen", true);

  if (!user) return null;

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
          {achievements.map((achievement) => {
            const userProgress = userAchievements.find(
              (ua) =>
                (ua.userId === user._id || ua.userId === user.id) &&
                ua.achievementId?._id === achievement._id
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
          })}
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
