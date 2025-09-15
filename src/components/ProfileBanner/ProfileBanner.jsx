import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/UserContext";

import "./ProfileBanner.css";

function ProfileBanner() {
  const { user } = useContext(CurrentUserContext);

  return (
    <div className="profile-banner">
      <img className="profile-banner__avatar"></img>
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
