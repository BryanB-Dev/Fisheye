"use client";

import { useState } from "react";
import styles from "../page.module.css";
import SortBar from "./SortBar";
import MediaCard from "./MediaCard";

export default function PhotographerContent({ medias }) {
  const [sortedMedias, setSortedMedias] = useState(() =>
    [...medias].sort((a, b) => b.likes - a.likes)
  );

  const handleSortChange = (newSortedMedias) => {
    setSortedMedias(newSortedMedias);
  };

  return (
    <>
      <SortBar medias={medias} onSortChange={handleSortChange} />

      <section className={styles.mediaSection} aria-label="Galerie">
        <div className={styles.mediaGrid}>
          {sortedMedias.map((media, index) => (
            <MediaCard
              key={media.id}
              media={media}
              mediaList={sortedMedias}
              mediaIndex={index}
            />
          ))}
        </div>
      </section>
    </>
  );
}
