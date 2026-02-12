"use client";

import { useState } from "react";
import LightboxModal from "./LightboxModal";

export default function LightboxTrigger({ mediaList, mediaIndex, ariaLabel, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={ariaLabel || "Ouvrir le média"}
      >
        {children}
      </div>
      {isOpen && (
        <LightboxModal
          mediaList={mediaList}
          initialIndex={mediaIndex}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
