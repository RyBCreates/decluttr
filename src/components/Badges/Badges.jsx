import Badge from "../Badge/Badge";
import { badges } from "../../utils/mockData/mockBadges";
import "./Badges.css";

function Badges() {
  return (
    <section className="badges profile__tab">
      <h2 className="badges__title">Here are your Badges!</h2>
      <ul className="badges__gallery">
        {badges
          .filter((badge) => badge.unlocked)
          .map((badge) => (
            <Badge key={badge.id} badge={badge} />
          ))}
      </ul>
    </section>
  );
}

export default Badges;
