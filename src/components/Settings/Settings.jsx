import ColorPicker from "../ColorPicker/ColorPicker";
import ProfileAvatarPicker from "../ProfileAvatarPicker/ProfileAvatarPicker";
import "./Settings.css";

function Settings({
  bannerColor,
  setBannerColor,
  bannerAvatar,
  setBannerAvatar,
}) {
  return (
    <section className="settings profile__tab">
      <p className="settings__title">Profile Settings</p>
      <div className="settings__content">
        <form className="settings__form">
          <ColorPicker
            bannerColor={bannerColor}
            setBannerColor={setBannerColor}
          />
          <ProfileAvatarPicker
            bannerAvatar={bannerAvatar}
            setBannerAvatar={setBannerAvatar}
          />
          <label className="settings__label">
            Change Your Username
            <input
              className="settings__input"
              type="text"
              value="Profile Name"
              onChange={() => {
                setUser();
              }}
            />
          </label>
        </form>
      </div>
    </section>
  );
}

export default Settings;
