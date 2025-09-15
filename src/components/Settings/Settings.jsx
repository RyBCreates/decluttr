import ColorPicker from "../ColorPicker/ColorPicker";
import "./Settings.css";

function Settings({ bannerColor, setBannerColor }) {
  return (
    <section className="settings profile__tab">
      <p className="settings__title">Profile Settings</p>
      <div className="settings__content">
        <form className="settings__form">
          <ColorPicker
            bannerColor={bannerColor}
            setBannerColor={setBannerColor}
          />
          <label className="settings__label">
            Change Your Username
            <input
              className="settings__input"
              type="text"
              value="Profile Name"
            />
          </label>
        </form>
      </div>
    </section>
  );
}

export default Settings;
