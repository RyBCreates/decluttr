import { useState, useContext } from "react";
import ProfileBanner from "../../ProfileBanner/ProfileBanner";
import ProfileNav from "../../ProfileNav/ProfileNav";
import Badges from "../../Badges/Badges";
import Achievements from "../../Achievements/Achievements";
import Goals from "../../Goals/Goals";
import Items from "../../Items/Items";
import Settings from "../../Settings/Settings";

import { CurrentUserContext } from "../../../contexts/UserContext";

import "./Profile.css";

function Profile({
  achievements,
  badges,
  userBadges,
  userAchievements,
  items,
  userItems,
}) {
  const { user } = useContext(CurrentUserContext);

  const [activeTab, setActiveTab] = useState("badges");

  const [bannerColor, setBannerColor] = useState("green");
  const [avatar, setAvatar] = useState(user?.avatar ?? "defaultAvatar");

  return (
    <div className="profile">
      <ProfileBanner bannerColor={bannerColor} avatar={avatar} />
      <ProfileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="profile__tab-content">
        {activeTab === "badges" && (
          <Badges badges={badges} userBadges={userBadges} />
        )}
        {activeTab === "achievements" && (
          <Achievements
            achievements={achievements}
            userAchievements={userAchievements}
          />
        )}
        {activeTab === "goals" && <Goals />}
        {activeTab === "items" && <Items items={items} userItems={userItems} />}
        {activeTab === "settings" && (
          <Settings
            setBannerColor={setBannerColor}
            avatar={avatar}
            setAvatar={setAvatar}
          />
        )}
      </div>
    </div>
  );
}

export default Profile;
