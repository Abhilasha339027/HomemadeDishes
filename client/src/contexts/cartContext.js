import { createContext, useReducer } from "react";

const initialState = { cart: null };

let cart = JSON.parse(localStorage.getItem("cart"));

if (cart) {
  initialState.cart = cart;
}

export const CartContext = createContext({
  cart: null,
  login: (userData) => {},
  logout: () => {},
});

function cartReducer(state, action) {
  switch (action.type) {
    case "SET_MAIN_CART":
      return {
        ...state,
        cart: action.payload,
      };

    case "REMOVE_MAIN_CART":
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return state;
  }
}

export const CartContextProvider = (props) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  // const [mainCart, setmainCart] = useState({});

  const setmainCart = (cartData) => {
    localStorage.setItem("cart", JSON.stringify(cartData));

    dispatch({
      type: "SET_MAIN_CART",
      payload: cartData,
    });
  };

  return (
    <CartContext.Provider value={{ mainCart: state.cart, setmainCart }}>
      {props.children}
    </CartContext.Provider>
  );
};
