import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    let updatedItems = [];
    if (existingCartItemIndex === -1) {
      updatedItems = state.items.concat(action.item);
    } else {
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex].amount += action.item.amount;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === 'REMOVE') {
    let updatedItems = [...state.items];
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItemAmount = state.items[existingCartItemIndex].amount;

    if (existingCartItemAmount > 1) {
      updatedItems[existingCartItemIndex].amount--;
    } else {
      updatedItems.splice(existingCartItemIndex, 1);
    }

    const existingCartItemPrice = state.items[existingCartItemIndex].price;
    const updatedTotalAmount = state.totalAmount - existingCartItemPrice;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: 'ADD',
      item: item,
    });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: 'REMOVE',
      id: id,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
