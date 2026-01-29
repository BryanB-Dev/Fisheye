"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";

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
        setActiveIndex((prev) => (prev + 1) % SORT_OPTIONS.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex(
          (prev) => (prev - 1 + SORT_OPTIONS.length) % SORT_OPTIONS.length
        );
        break;
      case "Enter":
        e.preventDefault();
        handleSortChange(SORT_OPTIONS[activeIndex].value);
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

  const selectedLabel = SORT_OPTIONS.find(
    (opt) => opt.value === selectedSort
  )?.label;

  return (
    <div className={styles.sortBar} ref={menuRef}>
      <span className={styles.sortLabel}>Trier par</span>
      <div className={styles.sortDropdown}>
        <button
          ref={buttonRef}
          type="button"
          className={styles.sortButton}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label="Trier les médias"
        >
          {selectedLabel}
        </button>

        {isOpen && (
          <ul
            className={styles.sortMenu}
            role="listbox"
            aria-label="Options de tri"
          >
            {SORT_OPTIONS.map((option, index) => (
              <li key={option.value} role="option">
                <button
                  type="button"
                  className={`${styles.sortMenuItem} ${
                    index === activeIndex ? styles.sortMenuItemActive : ""
                  } ${
                    option.value === selectedSort ? styles.sortMenuItemSelected : ""
                  }`}
                  onClick={() => handleSortChange(option.value)}
                  onKeyDown={handleKeyDown}
                  aria-selected={option.value === selectedSort}
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
