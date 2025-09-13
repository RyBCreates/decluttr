import { useState } from "react";
import ProfileBanner from "../../ProfileBanner/ProfileBanner";
import ProfileNav from "../../ProfileNav/ProfileNav";
import Badges from "../../Badges/Badges";

import "./Profile.css";

function Profile() {
  const [activeTab, setActiveTab] = useState("badges");

  return (
    <div className="profile">
      <ProfileBanner />
      <ProfileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="profile-tab-content">
        {activeTab === "badges" && <Badges />}
        {activeTab === "achievements" && <p>🎉 Your achievements go here.</p>}
        {activeTab === "goals" && <p>🎯 Your goals go here.</p>}
        {activeTab === "settings" && <p>⚙️ Profile settings here.</p>}
      </div>
    </div>
  );
}

export default Profile;
