import React, { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);

  const addServ = (item) => {
    setCarrinho([...carrinho, item]);
  };

  const removeServ = (item) => {
    setCarrinho(carrinho.filter((carrinhoItem) => carrinhoItem.id !== item.id));
  };

  const clearCarrinho = () => {
    setCarrinho([]);
  };

  const getTotal = () => {
    return carrinho.reduce((sum, item) => sum + item.valor, 0);
  };

  return (
    <CartContext.Provider value={{ carrinho, addServ, removeServ, clearCarrinho, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};