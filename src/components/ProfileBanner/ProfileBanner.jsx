import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/UserContext";

import "./ProfileBanner.css";

function ProfileBanner({ bannerColor }) {
  const { user } = useContext(CurrentUserContext);

  return (
    <div
      className={`profile-banner profile-banner__${bannerColor || "default"}`}
    >
      <img
        className="profile-banner__avatar"
        // src={user?.avatarUrl || "/default-avatar.png"}
        // alt={`${user?.username || "User"}'s avatar`}
      ></img>
      <div className="profile-banner__info">
        <h2 className="profile-banner__username">
          {user?.username || "Profile Name"}
        </h2>
        <p className="profile-banner__level">Level: {user?.level ?? 0}</p>
      </div>
    </div>
  );
}

export default ProfileBanner;
