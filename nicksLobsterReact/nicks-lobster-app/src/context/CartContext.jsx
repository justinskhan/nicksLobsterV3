import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
//functionality for adding to the cart from the menu incrementing by 1 
  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: (cartItem.quantity || 1) + (item.quantity || 1),
              }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };
//functionality for incrementing and decrementing values for food
  const updateQuantity = (id, delta) => {
    setCart((prev) => {
      return prev
        .map((cartItem) =>
          cartItem.id === id
            ? {
                ...cartItem,
                quantity: Math.max((cartItem.quantity || 1) + delta, 0),
              }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0);
    });
  };
//function for clearing cart when order is placed
  const clearCart = () => {
    setCart([]);
  };
//return function
  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}