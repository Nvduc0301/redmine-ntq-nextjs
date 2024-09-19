import React, { useState } from "react";

const ZIndexContext = React.createContext({
  zIndexCounter: 1,
  incrementZIndex: () => {},
});

const ZIndexProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [zIndexCounter, setZIndexCounter] = useState(1);

  const incrementZIndex = () => {
    setZIndexCounter((prev) => prev + 1);
  };

  return <ZIndexContext.Provider value={{ zIndexCounter, incrementZIndex }}>{children}</ZIndexContext.Provider>;
};

export { ZIndexProvider, ZIndexContext };
