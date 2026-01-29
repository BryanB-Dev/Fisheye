"use client";

import { useState } from "react";
import styles from "./page.module.css";
import SortBar from "./SortBar";
import MediaCard from "./MediaCard";
import LightboxTrigger from "./LightboxTrigger";

export default function PhotographerContent({ medias }) {
  const [sortedMedias, setSortedMedias] = useState(medias);

  const handleSortChange = (newSortedMedias) => {
    setSortedMedias(newSortedMedias);
  };

  return (
    <>
      <div className={styles.sortBar} aria-label="Tri des médias">
        <SortBar medias={medias} onSortChange={handleSortChange} />
      </div>

      <section className={styles.mediaSection} aria-label="Galerie">
        <div className={styles.mediaGrid}>
          {sortedMedias.map((media, index) => (
            <LightboxTrigger
              key={media.id}
              mediaList={sortedMedias}
              mediaIndex={index}
            >
              <MediaCard media={media} />
            </LightboxTrigger>
          ))}
        </div>
      </section>
    </>
  );
}
