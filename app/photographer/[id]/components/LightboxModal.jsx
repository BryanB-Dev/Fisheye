"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "../page.module.css";

export default function LightboxModal({ mediaList, initialIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const dialogRef = useRef(null);

  const currentMedia = mediaList[currentIndex];
  const totalMedia = mediaList.length;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % totalMedia);
      } else if (event.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + totalMedia) % totalMedia);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [totalMedia, onClose]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalMedia) % totalMedia);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalMedia);
  };

  return (
    <div
      className={styles.lightboxOverlay}
      role="presentation"
      onClick={onClose}
    >
      <div
        className={styles.lightbox}
        role="dialog"
        aria-modal="true"
        aria-label="image closeup view"
        onClick={(event) => event.stopPropagation()}
        ref={dialogRef}
        tabIndex={-1}
      >
        {/* Media Display */}
        <div className={styles.lightboxImageContainer}>
          <div className={styles.lightboxMediaFrame}>
            {currentMedia.image && (
              <Image
                src={`/${currentMedia.image}`}
                alt={currentMedia.title}
                width={1000}
                height={800}
                className={styles.lightboxImage}
                priority
              />
            )}
            {currentMedia.video && (
              <video
                src={`/${currentMedia.video}`}
                controls
                className={styles.lightboxVideo}
                aria-label={currentMedia.title}
              />
            )}
          </div>
        </div>

        {/* Close Button */}
        <button
          type="button"
          className={styles.lightboxClose}
          onClick={onClose}
          aria-label="Close dialog"
        >
          <svg className={styles.lightboxCloseIcon} width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="currentColor"/>
          </svg>
        </button>

        {/* Previous Button */}
        <button
          type="button"
          className={styles.lightboxPrev}
          onClick={handlePrevious}
          aria-label="Previous image"
        >
          <svg className={styles.lightboxArrowIcon} width="30" height="48" viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M29.6399 42.36L11.3199 24L29.6399 5.64L23.9999 -2.46532e-07L-0.000107861 24L23.9999 48L29.6399 42.36Z" fill="currentColor"/>
          </svg>
        </button>

        {/* Next Button */}
        <button
          type="button"
          className={styles.lightboxNext}
          onClick={handleNext}
          aria-label="Next image"
        >
          <svg className={styles.lightboxArrowIcon} width="30" height="48" viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M5.05138e-07 5.64L18.32 24L6.72563e-08 42.36L5.64 48L29.64 24L5.64 3.88195e-06L5.05138e-07 5.64Z" fill="currentColor"/>
          </svg>
        </button>

        {/* Media Title - Bottom Left */}
        <div className={styles.lightboxTitle}>{currentMedia.title}</div>
      </div>
    </div>
  );
}
