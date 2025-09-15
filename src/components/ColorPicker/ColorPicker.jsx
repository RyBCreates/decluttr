import "./ColorPicker.css";

function ColorPicker({ bannerColor, setBannerColor }) {
  return (
    <fieldset className="color-picker">
      <legend className="color-picker__legend">Pick a Banner Color</legend>
      <label>
        <input
          type="radio"
          name="color"
          value="red"
          checked={bannerColor === "red"}
          onChange={() => {
            setBannerColor("red");
          }}
        />
        Red
      </label>
      <label>
        <input
          type="radio"
          name="color"
          value="blue"
          checked={bannerColor === "blue"}
          onChange={() => {
            setBannerColor("blue");
          }}
        />
        Blue
      </label>
      <label>
        <input
          type="radio"
          name="color"
          value="green"
          checked={bannerColor === "green"}
          onChange={() => {
            setBannerColor("green");
          }}
        />
        Green
      </label>
      <label>
        <input
          type="radio"
          name="color"
          value="gold"
          checked={bannerColor === "gold"}
          onChange={() => {
            setBannerColor("gold");
          }}
        />
        Gold
      </label>
    </fieldset>
  );
}

export default ColorPicker;
