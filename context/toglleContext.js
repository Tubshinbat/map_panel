"use client";
import { createContext, useContext, useState } from "react";
const ToggleContext = createContext({});

export const ToggleProvider = ({ children }) => {
  const [side, setSide] = useState(true);

  const handleToggleSideMenu = () => {
    const toggle = side ? false : true;
    document.body.setAttribute(
      "data-sidebartype",
      toggle ? "full" : "mini-sidebar"
    );
    console.log(toggle);
    setSide(toggle);
  };

  return (
    <ToggleContext.Provider value={{ handleToggleSideMenu, side }}>
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggleContext = () => useContext(ToggleContext);
