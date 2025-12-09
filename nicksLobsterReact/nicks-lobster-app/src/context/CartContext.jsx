import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [loaded, setLoaded] = useState(false); //making sure to load before auto-saving

  //create cart
  useEffect(() => {
    let existingId = localStorage.getItem("cartId");
    if (!existingId) {

      if (window.crypto?.randomUUID) {
        existingId = window.crypto.randomUUID();
      } else {
        existingId = "cart_" + Math.random().toString(36).slice(2);
      }
      localStorage.setItem("cartId", existingId);
    }
    setCartId(existingId);
  }, []);

  //load cart from backend
  useEffect(() => {
    if (!cartId) return;

    async function loadCart() {
      try {
        const res = await fetch(`${API_BASE_URL}/carts/${cartId}`);
        if (!res.ok) {
          console.error("Failed to load cart:", res.status);
          setLoaded(true);
          return;
        }
        const data = await res.json();
        if (Array.isArray(data.items)) {
          setCart(data.items);
        }
      } catch (err) {
        console.error("Error loading cart:", err);
      } finally {
        setLoaded(true);
      }
    }

    loadCart();
  }, [cartId]);

  //saving changes to cart in the backend
  useEffect(() => {
    if (!loaded || !cartId) return;

    async function saveCart() {
      try {
        await fetch(`${API_BASE_URL}/carts/${cartId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: cart }),
        });
      } catch (err) {
        console.error("Error saving cart:", err);
      }
    }

    saveCart();
  }, [cart, cartId, loaded]);

    //adding an item to cart
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
  //functionality for incrementing or decrementing
  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((cartItem) =>
          cartItem.id === id
            ? {
                ...cartItem,
                quantity: Math.max((cartItem.quantity || 1) + delta, 0),
              }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}