import React from 'react';

// Create context and pass an object with properties that will drive the IntelliSense auto-completion.
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;
