import { useState } from "react";
import ProfileBanner from "../../ProfileBanner/ProfileBanner";
import ProfileNav from "../../ProfileNav/ProfileNav";
import Badges from "../../Badges/Badges";
import Achievements from "../../Achievements/Achievements";
import Goals from "../../Goals/Goals";
import Items from "../../Items/Items";
import Settings from "../../Settings/Settings";

import "./Profile.css";

function Profile({ achievements, badges }) {
  const [activeTab, setActiveTab] = useState("badges");

  const [bannerColor, setBannerColor] = useState("green");
  const [bannerAvatar, setBannerAvatar] = useState("defaultAvatar");

  return (
    <div className="profile">
      <ProfileBanner bannerColor={bannerColor} bannerAvatar={bannerAvatar} />
      <ProfileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="profile__tab-content">
        {activeTab === "badges" && <Badges badges={badges} />}
        {activeTab === "achievements" && (
          <Achievements achievements={achievements} />
        )}
        {activeTab === "goals" && <Goals />}
        {activeTab === "items" && <Items />}
        {activeTab === "settings" && (
          <Settings
            setBannerColor={setBannerColor}
            setBannerAvatar={setBannerAvatar}
          />
        )}
      </div>
    </div>
  );
}

export default Profile;
