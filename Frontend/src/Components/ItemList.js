import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem, removeItem } from "../utils/cartSlice";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();
  const [itemQuantities, setItemQuantities] = useState({});

  // useEffect(() => {
  //   console.log(itemQuantities);
  // }, [itemQuantities]);

  const handleAddItem = (item) => {
    const itemId = item.card.info.id;
    const currentQuantity = itemQuantities[itemId] || 0;

    // Dispatch addItem action to add the item to the cart
    dispatch(addItem(item));

    // Update quantity in local state
    const newQuantity = currentQuantity + 1;
    setItemQuantities((prevState) => ({
      ...prevState,
      [itemId]: newQuantity,
    }));
  };

  useEffect(() => {
    // Update UI or dispatch any necessary actions here
    console.log("Item quantities updated:", itemQuantities);
  }, [itemQuantities]);

  const handleRemoveItem = (item) => {
    const itemId = item.card.info.id;
    const currentQuantity = itemQuantities[itemId] || 0;

    if (currentQuantity === 1) {
      // If only one item is in the cart, remove it from Redux store and local state
      dispatch(removeItem(item));

      // Update local state functionally
      setItemQuantities((prevState) => {
        const { [itemId]: deletedItem, ...newQuantities } = prevState;
        return newQuantities;
      });
    } else if (currentQuantity > 1) {
      // Update quantity in local state and Redux store
      const newQuantity = currentQuantity - 1;
      setItemQuantities((prevState) => ({
        ...prevState,
        [itemId]: newQuantity,
      }));
      dispatch(removeItem(item)); // Dispatch removeItem action to update Redux store
    }
  };

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between relative"
        >
          <div className="w-9/12">
            <div className="py-2">
              <span>{item.card.info.name}</span>
              <span>
                - ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="text-xs">{item.card.info.description}</p>
          </div>
          <div className="w-3/12 p-4 relative">
            <img src={CDN_URL + item.card.info.imageId} className="w-full" />
            <div className="absolute top-0 right-0 flex items-center">
              <button
                className="p-2 rounded-lg bg-black text-white shadow-lg"
                onClick={() => handleAddItem(item)}
              >
                Add
              </button>
              {itemQuantities[item.card.info.id] > 0 && (
                <div className="flex items-center">
                  <button
                    className="p-2 mx-2 rounded-lg bg-red-500 text-white shadow-lg"
                    onClick={() => handleRemoveItem(item)}
                  >
                    -
                  </button>
                  <span>{itemQuantities[item.card.info.id]}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
