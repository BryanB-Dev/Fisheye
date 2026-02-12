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

        {/* Close Button */}
        <button
          type="button"
          className={styles.lightboxClose}
          onClick={onClose}
          aria-label="Close dialog"
        >
          ×
        </button>

        {/* Previous Button */}
        <button
          type="button"
          className={styles.lightboxPrev}
          onClick={handlePrevious}
          aria-label="Previous image"
        >
          <span className={styles.lightboxArrow}>‹</span>
        </button>

        {/* Next Button */}
        <button
          type="button"
          className={styles.lightboxNext}
          onClick={handleNext}
          aria-label="Next image"
        >
          <span className={styles.lightboxArrow}>›</span>
        </button>

        {/* Media Title - Bottom Left */}
        <div className={styles.lightboxTitle}>{currentMedia.title}</div>
      </div>
    </div>
  );
}
