"use client";

import { useState, useRef, useEffect } from "react";
import styles from "../page.module.css";

const SORT_OPTIONS = [
  { label: "Popularité", value: "popularity" },
  { label: "Date", value: "date" },
  { label: "Titre", value: "title" },
];

export default function SortBar({ medias, onSortChange }) {
  const [selectedSort, setSelectedSort] = useState("popularity");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const listboxId = "sort-media-options";
  const labelId = "order-by-label";
  const visibleOptions = SORT_OPTIONS.filter((opt) => opt.value !== selectedSort);

  // Sort medias based on selection
  const getSortedMedias = (sortType) => {
    const mediaCopy = [...medias];

    switch (sortType) {
      case "popularity":
        return mediaCopy.sort((a, b) => b.likes - a.likes);
      case "date":
        return mediaCopy.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      case "title":
        return mediaCopy.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return mediaCopy;
    }
  };

  const handleSortChange = (sortValue) => {
    setSelectedSort(sortValue);
    const sorted = getSortedMedias(sortValue);
    onSortChange(sorted);
    setIsOpen(false);
    setActiveIndex(0);
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setIsOpen(true);
      setActiveIndex(0);
      return;
    }

    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % visibleOptions.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex(
          (prev) => (prev - 1 + visibleOptions.length) % visibleOptions.length
        );
        break;
      case "Enter":
        e.preventDefault();
        handleSortChange(visibleOptions[activeIndex].value);
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      default:
        break;
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (activeIndex >= visibleOptions.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, visibleOptions.length]);

  const selectedLabel = SORT_OPTIONS.find(
    (opt) => opt.value === selectedSort
  )?.label;

  return (
    <div className={styles.sortBar} ref={menuRef}>
      <span id={labelId} className={styles.sortLabel}>Trier par</span>
      <div className={styles.sortDropdown}>
        <button
          ref={buttonRef}
          type="button"
          className={`${styles.sortButton} ${isOpen ? styles.sortButtonOpen : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label="Order by"
          aria-controls={listboxId}
          aria-activedescendant={isOpen ? `sort-option-${visibleOptions[activeIndex]?.value}` : undefined}
        >
          <span className={styles.sortButtonLabel}>{selectedLabel}</span>
          <span
            className={`${styles.sortChevron} ${isOpen ? styles.sortChevronOpen : ""}`}
            aria-hidden="true"
          />
        </button>

        {isOpen && (
          <ul
            id={listboxId}
            className={styles.sortMenu}
            role="listbox"
            aria-labelledby={labelId}
          >
            {visibleOptions.map((option, index) => (
              <li key={option.value} role="none">
                <button
                  type="button"
                  role="option"
                  id={`sort-option-${option.value}`}
                  className={`${styles.sortMenuItem} ${
                    index === activeIndex ? styles.sortMenuItemActive : ""
                  }`}
                  onClick={() => handleSortChange(option.value)}
                  onKeyDown={handleKeyDown}
                  aria-selected={false}
                  tabIndex={index === activeIndex ? 0 : -1}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
