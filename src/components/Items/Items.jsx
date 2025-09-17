import "./Items.css";
import { useContext } from "react";
import ShopItem from "../ShopItem/ShopItem.jsx";
import { CurrentUserContext } from "../../contexts/UserContext";

function Items({ items }) {
  const { user } = useContext(CurrentUserContext);

  return (
    <div className="items profile__tab">
      <h2 className="items__title">Here are the Items you have!</h2>
      {user ? (
        <div className="items__list">
          {items.map((item) => (
            <div key={item._id} className="items__list_disable-click">
              <ShopItem item={item} />
            </div>
          ))}
        </div>
      ) : (
        <p>Please log in to see your items.</p>
      )}
    </div>
  );
}

export default Items;
