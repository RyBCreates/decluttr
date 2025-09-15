import "./ColorPicker.css";

function ColorPicker({ bannerColor, setBannerColor }) {
  return (
    <fieldset className="color-picker">
      <legend className="color-picker__legend">Pick a Banner Color</legend>
      <label className="color-picker__label">
        <input
          className="color-picker__color"
          type="radio"
          name="color"
          value="red"
          checked={bannerColor === "red"}
          onChange={() => {
            setBannerColor("red");
          }}
        />
        <div className="color-picker__swatch color-picker__swatch_red"></div>
        Red
      </label>
      <label className="color-picker__label">
        <input
          className="color-picker__color"
          type="radio"
          name="color"
          value="blue"
          checked={bannerColor === "blue"}
          onChange={() => {
            setBannerColor("blue");
          }}
        />
        <div className="color-picker__swatch color-picker__swatch_blue"></div>
        Blue
      </label>
      <label className="color-picker__label">
        <input
          className="color-picker__color"
          type="radio"
          name="color"
          value="green"
          checked={bannerColor === "green"}
          onChange={() => {
            setBannerColor("green");
          }}
        />
        <div className="color-picker__swatch color-picker__swatch_green"></div>
        Green
      </label>
      <label className="color-picker__label">
        <input
          className="color-picker__color"
          type="radio"
          name="color"
          value="gold"
          checked={bannerColor === "gold"}
          onChange={() => {
            setBannerColor("gold");
          }}
        />
        <div className="color-picker__swatch color-picker__swatch_gold"></div>
        Gold
      </label>
    </fieldset>
  );
}

export default ColorPicker;
