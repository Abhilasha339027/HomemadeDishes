import React, { createContext, useState } from "react";

export const UIThemeContext = createContext();

export const UIThemeProvider = (props) => {
  let isLight = true;

  const [uiSettings, setuiSettings] = useState({
    isLight,
  });

  return (
    <UIThemeContext.Provider value={[uiSettings, setuiSettings]}>
      {props.children}
    </UIThemeContext.Provider>
  );
};
