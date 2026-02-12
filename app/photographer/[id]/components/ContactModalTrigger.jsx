"use client";

import { useState } from "react";
import styles from "../page.module.css";
import ContactModal from "./ContactModal";

export default function ContactModalTrigger({ photographerName }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.contactButton}
        onClick={() => setIsOpen(true)}
        aria-label="Contact Me"
      >
        Contactez-moi
      </button>
      <ContactModal
        photographerName={photographerName}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
