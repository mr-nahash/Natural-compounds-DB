// LipinskiContext.js
"use client";
import React, { createContext, useContext, useState } from "react";

const LipinskiContext = createContext();

export const LipinskiProvider = ({ children }) => {
  const [descriptorValues, setDescriptorValues] = useState({});
  
  const contextValue = {
    descriptorValues,
    setDescriptorValues,
  };

  return (
    <LipinskiContext.Provider value={contextValue}>
      {children}
    </LipinskiContext.Provider>
  );
};

export const useLipinskiContext = () => {
  return useContext(LipinskiContext);
};
