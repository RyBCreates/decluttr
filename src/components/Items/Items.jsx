import "./Items.css";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/UserContext";
// import { getShopItems } from "../../utils/api/shopItems";
// import { set } from "mongoose";
import ShopItem from "../ShopItem/ShopItem.jsx";

// function Items() {
//   const { user } = useContext(CurrentUserContext);
// const [shopItems, setShopItems] = useState([]);
// const [loading, setLoading] = useState(true);
// if (!user) return null;

// useEffect(() => {
//   async function loadItems() {
//     setLoading(true);
//     try {
//       const items = await getShopItems();
//       setShopItems(items);
//     } catch (err) {
//       console.error("Failed to load items", err);
//       setShopItems([]);
//     } finally {
//       setLoading(false);
//     }
//   }
//   loadItems();
// }, []);

//   const ownedItemData = userItems.filter(
//     (ui) => ui.userId === user.id && (ui.uses ?? 0) > 0
//   );

//   const ownedItems = ownedItemData
//     .map((ui) => {
//       const meta = items.find((item) => item.id == ui.itemId);

//       return meta ? { ...meta, uses: ui.uses } : null;
//     })
//     .filter(Boolean);

//   return (
//     <div className="items profile__tab">
//       <h2 className="items__title">Here are the Items you have!</h2>
//       {ownedItems.length === 0 && <p>You have no purchased items</p>}
//       <ul className="items__list-container">
//         {ownedItems.map((item) => (
//           <li className="items__list-item" key={item.id}>
//             {item.name} - Uses left: {item.uses}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
function Items({ items }) {
  return (
    <section className="items profile__tab">
      <h2 className="items__title">Here are the Items you have!</h2>
      <ul className="items__gallery">
        {items.map((item) => (
          <ShopItem key={item._id} item={item} />
        ))}
      </ul>
    </section>
  );
}

export default Items;
