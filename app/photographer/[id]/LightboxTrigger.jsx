"use client";

import { useState } from "react";
import LightboxModal from "./LightboxModal";

export default function LightboxTrigger({ mediaList, mediaIndex, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)} role="button" tabIndex={0}>
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
