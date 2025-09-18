import ShopItem from "../ShopItem/ShopItem.jsx";

import "./Items.css";

function Items({ items, userItems }) {
  return (
    <div className="items profile__tab">
      <h2 className="items__title">Here are the Items you have!</h2>
      {userItems.length > 0 ? (
        <div className="items__list">
          {items.map((item) => {
            const userItem = userItems.find((ui) => ui.itemId === item._id);
            const quantity = userItem?.quantity ?? 0;

            return (
              <div key={item._id} className="items__list_disable-click">
                <ShopItem
                  item={item}
                  shopItemVariant="user"
                  quantity={quantity}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <p>You don’t have any items yet.</p>
      )}
    </div>
  );
}
export default Items;
