import { useContext, useEffect, useMemo, useState } from "react";

import { updateUserInfo } from "../../utils/api/user";
import { CurrentUserContext } from "../../contexts/UserContext";

import ColorPicker from "../ColorPicker/ColorPicker";
import ProfileAvatarPicker from "../ProfileAvatarPicker/ProfileAvatarPicker";
import "./Settings.css";

const USERNAME_REGEX = /^[A-Za-z0-9]{3,16}$/;

function Settings({
  bannerColor,
  setBannerColor,
  bannerAvatar,
  setBannerAvatar,
}) {
  const { user, setUser } = useContext(CurrentUserContext);
  const original = user?.username ?? "";
  const [username, setUsername] = useState(original);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setUsername(user?.username ?? "");
    setMsg("");
  }, [user?.username]);

  const valid = useMemo(() => USERNAME_REGEX.test(username), [username]);
  const unchanged = username === original;

  useEffect(() => {
    if (!unchanged && !valid) {
      setMsg(
        "Username must be 3–16 letters or numbers (no spaces or special characters)."
      );
    } else {
      setMsg("");
    }
  }, [unchanged, valid]);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!valid) {
      setMsg(
        "Username must be 3–16 letters or numbers (no spaces or special characters)."
      );
      return;
    }
    if (unchanged) {
      setMsg("No changes to save.");
      return;
    }
    try {
      // Pass in avatar when avatar picker is added.
      const updatedUser = await updateUserInfo({ username });
      setUser(updatedUser);
      setMsg("Username updated.");
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <section className="settings profile__tab">
      <p className="settings__title">Profile Settings</p>
      <div className="settings__content">
        <form className="settings__form" onSubmit={handleSubmit} noValidate>
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
              className={`settings__input ${
                !unchanged && !valid ? "settings__input_invalid" : ""
              }`}
              type="text"
              value={username}
              onChange={handleChange}
              minLength={3}
              maxLength={16}
              autoComplete="off"
              inputMode="text"
              pattern="[A-Za-z0-9]{3,16}"
              title="3–16 letters/numbers; no spaces or special characters"
              aria-invalid={!valid}
              aria-describedby="settings-username-help"
            />
          </label>
          <button
            className="settings__submit"
            type="submit"
            disabled={!valid || unchanged}
            title={
              !valid
                ? "3–16 letters/numbers; no spaces or special characters"
                : undefined
            }
          >
            Save
          </button>

          <p
            id="settings-username-help"
            className={`settings__message ${
              !valid ? "settings__message_error" : ""
            }`}
          >
            {msg ||
              "Use 3–16 letters or numbers; no spaces or special characters."}
          </p>
        </form>
      </div>
    </section>
  );
}

export default Settings;
