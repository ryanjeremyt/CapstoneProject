import React, { createContext, useEffect, useState } from "react";
import { backend_url } from "../App";

export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => getDefaultCart());

  function getDefaultCart() {
    const cart = {};
    for (let i = 0; i < 300; i++) cart[i] = 0;
    return cart;
  }

  useEffect(() => {
    fetch(`${backend_url}/allproducts`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));

    const token = localStorage.getItem("auth-token");
    if (token) {
      fetch(`${backend_url}/getcart`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data && typeof data === 'object' && !Array.isArray(data)) {
            setCartItems(data);
          } else {
            console.warn("Invalid cart data received:", data);
            setCartItems(getDefaultCart());
          }
        })
        .catch((err) => {
          console.error("Failed to fetch cart:", err);
          setCartItems(getDefaultCart());
        });
    }
  }, []);

  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [itemId, qty]) => {
      const product = products.find((p) => p.id === Number(itemId));
      const safeQty = typeof qty === "number" && !isNaN(qty) ? qty : 0;
      return product ? total + product.new_price * safeQty : total;
    }, 0);
  };

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((sum, qty) => {
      const safeQty = typeof qty === "number" && !isNaN(qty) ? qty : 0;
      return sum + safeQty;
    }, 0);
  };

  const addToCart = (itemId) => {
    if (!localStorage.getItem("auth-token")) {
      alert("Please Login");
      return;
    }

    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    fetch(`${backend_url}/addtocart`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'auth-token': localStorage.getItem("auth-token"),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId }),
    }).catch((err) => console.error("Error adding to cart:", err));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));

    fetch(`${backend_url}/removefromcart`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'auth-token': localStorage.getItem("auth-token"),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId }),
    }).catch((err) => console.error("Error removing from cart:", err));
  };

  const clearCart = async () => {
    setCartItems(getDefaultCart());

    const token = localStorage.getItem("auth-token");
    if (token) {
      try {
        const res = await fetch(`${backend_url}/clearcart`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'auth-token': token,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          console.error("Failed to clear cart:", await res.text());
        }
      } catch (err) {
        console.error("Error clearing cart:", err);
      }
    }
  };

  const contextValue = {
    products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartItems,
    getTotalCartAmount,
    clearCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
