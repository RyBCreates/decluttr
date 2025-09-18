import ShopItem from "../ShopItem/ShopItem";
import "./StoreMenu.css";

function StoreMenu({
  shopItems,
  selectedItemId,
  setSelectedItemId,
  setStatus,
}) {
  return (
    <div className="store-menu">
      <h3 className="store-menu__title">Buy Items</h3>
      <ul className="store-menu__items">
        {shopItems.map((item) => (
          <ShopItem
            key={item._id}
            item={item}
            selectedItemId={selectedItemId}
            setSelectedItemId={setSelectedItemId}
            setStatus={setStatus}
            shopItemVariant="shop"
          />
        ))}
      </ul>
    </div>
  );
}

export default StoreMenu;
