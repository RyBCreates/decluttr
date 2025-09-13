import "./ProfileBanner.css";

function ProfileBanner() {
  return (
    <div className="profile-banner">
      <img className="profile-banner__avatar"></img>
      <div className="profile-banner__info">
        <h2 className="profile-banner__username">Profile Name</h2>
        <p className="profile-banner__level">Level: 10</p>
      </div>
    </div>
  );
}

export default ProfileBanner;
