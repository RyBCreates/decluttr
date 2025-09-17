import "./ProfileAvatarPicker.css";
import defaultAvatar from "../../assets/profile/default_profile.png";
import frog from "../../assets/profile/frog_profile.png";
import duck from "../../assets/profile/duck_profile.png";
import bear from "../../assets/profile/bear_profile.png";
import dog from "../../assets/profile/dog_profile.png";

export const avatarImages = {
  defaultAvatar,
  frog,
  duck,
  bear,
  dog,
};

function ProfileAvatarPicker({ bannerAvatar, setBannerAvatar }) {
  return (
    <fieldset className="avatar-picker">
      <legend className="avatar-picker__legend">Pick an Avatar</legend>
      <label className="avatar-picker__label">
        <input
          className="avatar-picker__avatar"
          type="radio"
          name="avatar"
          value="defaultAvatar"
          checked={bannerAvatar === "defaultAvatar"}
          onChange={() => {
            setBannerAvatar("defaultAvatar");
          }}
        />
        <img
          className="avatar-picker__img avatar-picker_img_defaultAvatar"
          src={defaultAvatar}
          alt="default avatar"
        />
      </label>
      <label className="avatar-picker__label">
        <input
          className="avatar-picker__avatar"
          type="radio"
          name="avatar"
          value="frog"
          checked={bannerAvatar === "frog"}
          onChange={() => {
            setBannerAvatar("frog");
          }}
        />
        <img
          className="avatar-picker__img avatar-picker_img_frog"
          src={frog}
          alt="frog avatar"
        />
      </label>
      <label className="avatar-picker__label">
        <input
          className="avatar-picker__avatar"
          type="radio"
          name="avatar"
          value="duck"
          checked={bannerAvatar === "duck"}
          onChange={() => {
            setBannerAvatar("duck");
          }}
        />
        <img
          className="avatar-picker__img avatar-picker_img_duck"
          src={duck}
          alt="duck avatar"
        />
      </label>
      <label className="avatar-picker__label">
        <input
          className="avatar-picker__avatar"
          type="radio"
          name="avatar"
          value="bear"
          checked={bannerAvatar === "bear"}
          onChange={() => {
            setBannerAvatar("bear");
          }}
        />
        <img
          className="avatar-picker__img avatar-picker_img_bear"
          src={bear}
          alt="bear avatar"
        />
      </label>
      <label className="avatar-picker__label">
        <input
          className="avatar-picker__avatar"
          type="radio"
          name="avatar"
          value="dog "
          checked={bannerAvatar === "dog"}
          onChange={() => {
            setBannerAvatar("dog");
          }}
        />
        <img
          className="avatar-picker__img avatar-picker_img_dog"
          src={dog}
          alt="dog avatar"
        />
      </label>
    </fieldset>
  );
}

export default ProfileAvatarPicker;
