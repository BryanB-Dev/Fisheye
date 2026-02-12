"use client";

import { createContext, useContext, useState } from "react";

const LikesContext = createContext();

export function LikesProvider({ children, initialTotalLikes }) {
  const [totalLikes, setTotalLikes] = useState(initialTotalLikes);

  const updateTotalLikes = (increment) => {
    setTotalLikes((prev) => prev + increment);
  };

  return (
    <LikesContext.Provider value={{ totalLikes, updateTotalLikes }}>
      {children}
    </LikesContext.Provider>
  );
}

export function useLikesContext() {
  const context = useContext(LikesContext);
  if (!context) {
    throw new Error("useLikesContext must be used within LikesProvider");
  }
  return context;
}
