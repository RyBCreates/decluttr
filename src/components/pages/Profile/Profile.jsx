import { useState } from "react";
import ProfileBanner from "../../ProfileBanner/ProfileBanner";
import ProfileNav from "../../ProfileNav/ProfileNav";
import Badges from "../../Badges/Badges";
import Achievements from "../../Achievements/Achievements";
import Goals from "../../Goals/Goals";
import Settings from "../../Settings/Settings";

import "./Profile.css";

function Profile() {
  const [activeTab, setActiveTab] = useState("badges");

  return (
    <div className="profile">
      <ProfileBanner />
      <ProfileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="profile__tab-content">
        {activeTab === "badges" && <Badges />}
        {activeTab === "achievements" && <Achievements />}
        {activeTab === "goals" && <Goals />}
        {activeTab === "settings" && <Settings />}
      </div>
    </div>
  );
}

export default Profile;
