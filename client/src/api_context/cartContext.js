import { createContext, useState } from 'react';

export const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (car) => {
    setCart([...cart, car]);
  };

  const removeFromCart = (car) => {
    setCart(cart.filter((item) => item !== car));
  };
  
  const clearCart = () => {
    setCart([]);
  };

  return (
    <cartContext.Provider value={{ cartItems: cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </cartContext.Provider>
  );
};
