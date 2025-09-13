import "./ProfileNav.css";

function ProfileNav({ activeTab, setActiveTab }) {
  return (
    <div className="profile-nav" role="tablist">
      <button
        className={`profile-nav__tab ${
          activeTab === "badges" ? "profile-nav__tab_active" : ""
        }`}
        role="tab"
        aria-selected={activeTab === "badges"}
        onClick={() => setActiveTab("badges")}
      >
        Badges
      </button>
      <button
        className={`profile-nav__tab ${
          activeTab === "achievements" ? "profile-nav__tab_active" : ""
        }`}
        role="tab"
        aria-selected={activeTab === "achievements"}
        onClick={() => setActiveTab("achievements")}
      >
        Achievements
      </button>
      <button
        className={`profile-nav__tab ${
          activeTab === "goals" ? "profile-nav__tab_active" : ""
        }`}
        role="tab"
        aria-selected={activeTab === "goals"}
        onClick={() => setActiveTab("goals")}
        disabled
      >
        Goals (Coming Soon)
      </button>
      <button
        className={`profile-nav__tab ${
          activeTab === "settings" ? "profile-nav__tab_active" : ""
        }`}
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
