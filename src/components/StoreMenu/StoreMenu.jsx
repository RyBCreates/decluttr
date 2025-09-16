import ShopItem from "../ShopItem/ShopItem";
import "./StoreMenu.css";

function StoreMenu({ items, selectedItemId, setSelectedItemId, setStatus }) {
  return (
    <div className="store-menu">
      <h3 className="store-menu__title">Buy Items</h3>
      <ShopItem
        items={items}
        selectedItemId={selectedItemId}
        setSelectedItemId={setSelectedItemId}
        setStatus={setStatus}
      />
    </div>
  );
}

export default StoreMenu;
