"use client";

import { useEffect, useRef } from "react";
import styles from "../page.module.css";

export default function ContactModal({ photographerName, isOpen, onClose }) {
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    firstFieldRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} role="presentation" onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        onClick={(event) => event.stopPropagation()}
        ref={dialogRef}
      >
        <button
          type="button"
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close Contact form"
        >
          ×
        </button>
        <h1 id="contact-modal-title" className={styles.modalTitle}>
          Contactez-moi
          {" "}
          <span className={styles.modalName}>{photographerName}</span>
        </h1>
        <form
          className={styles.modalForm}
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const payload = Object.fromEntries(formData.entries());
            console.log(payload);
            onClose();
          }}
        >
          <label htmlFor="firstname" className={styles.modalLabel}>
            Prénom
            <input
              id="firstname"
              ref={firstFieldRef}
              name="firstname"
              type="text"
              className={styles.modalInput}
              required
            />
          </label>
          <label htmlFor="lastname" className={styles.modalLabel}>
            Nom
            <input id="lastname" name="lastname" type="text" className={styles.modalInput} required />
          </label>
          <label htmlFor="email" className={styles.modalLabel}>
            Email
            <input id="email" name="email" type="email" className={styles.modalInput} required />
          </label>
          <label htmlFor="message" className={styles.modalLabel}>
            Votre message
            <textarea
              id="message"
              name="message"
              className={styles.modalTextarea}
              required
            />
          </label>
          <button type="submit" className={styles.modalSubmit} aria-label="Send">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
