import "./Items.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/UserContext";
import { items } from "../../utils/mockData/mockItems";
import { userItems } from "../../utils/mockData/mockUserItems";

function Items() {
  const { user } = useContext(CurrentUserContext);
  if (!user) return null;

  const ownedItemData = userItems.filter(
    (ui) => ui.userId === user.id && (ui.uses ?? 0) > 0
  );

  const ownedItems = ownedItemData
    .map((ui) => {
      const meta = items.find((item) => item.id == ui.itemId);

      return meta ? { ...meta, uses: ui.uses } : null;
    })
    .filter(Boolean);

  return (
    <div className="items profile__tab">
      <h2 className="items__title">Here are the Items you have!</h2>
      {ownedItems.length === 0 && <p>You have no purchased items</p>}
      <ul className="items__list-container">
        {ownedItems.map((item) => (
          <li className="items__list-item" key={item.id}>
            {item.name} - Uses left: {item.uses}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Items;
