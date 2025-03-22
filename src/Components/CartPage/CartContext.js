import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState("");

  const addToCart = (product) => {
    const newItem = { ...product, id: product.productId || Date.now() };
    setCartItems((prevItems) => [...prevItems, newItem]);
    setMessage("Ürününüz sepete eklendi!");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) =>
        total + parseFloat(item.priceText.replace("TL", "").trim()),
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        message,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
