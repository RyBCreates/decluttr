import "./ProfileNav.css";

function ProfileNav({ activeTab, setActiveTab }) {
  return (
    <div className="profile-nav" role="tablist">
      <button
        className="profile-nav__tab"
        role="tab"
        aria-selected={activeTab === "badges"}
        onClick={() => setActiveTab("badges")}
      >
        Badges
      </button>
      <button
        className="profile-nav__tab"
        role="tab"
        aria-selected={activeTab === "achievements"}
        onClick={() => setActiveTab("achievements")}
      >
        Achievements
      </button>
      <button
        className="profile-nav__tab"
        role="tab"
        aria-selected={activeTab === "goals"}
        onClick={() => setActiveTab("goals")}
      >
        Goals
      </button>
      <button
        className="profile-nav__tab"
        role="tab"
        aria-selected={activeTab === "settings"}
        onClick={() => setActiveTab("settings")}
      >
        Settings
      </button>
    </div>
  );
}

export default ProfileNav;
