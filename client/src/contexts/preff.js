import { createContext, useReducer } from "react";

const initialState = {
  pref: { deliveryOption: "delivery", diet: [], deliveryDay: [] },
};

let prefFromStorage = JSON.parse(localStorage.getItem("pref"));
if (prefFromStorage) {
  initialState.pref = prefFromStorage;
}

export const PrefContext = createContext({
  pref: null,
  changePref: (data) => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "ADD_PREF":
      return {
        ...state,
        pref: action.payload,
      };

    default:
      return state;
  }
}

export const PrefProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const changePref = (data) => {
    const stringifiedData = JSON.stringify(data);
    localStorage.setItem("pref", stringifiedData);
    dispatch({
      type: "ADD_PREF",
      payload: data,
    });
  };

  return (
    <PrefContext.Provider
      value={{ pref: state.pref, changePref }}
      {...props}
    ></PrefContext.Provider>
  );
};
