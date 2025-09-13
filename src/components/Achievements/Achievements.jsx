import Achievement from "../Achievement/Achievement";
import "./Achievements.css";

function Achievements() {
  return (
    <section className="achievements profile__tab">
      <h2 className="achievements__title">Here are your Achievements!</h2>
      <div className="achievements__collection">
        <Achievement />
        <Achievement />
        <Achievement />
      </div>
    </section>
  );
}

export default Achievements;
