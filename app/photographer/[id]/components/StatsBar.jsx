"use client";

import styles from "../page.module.css";
import { useLikesContext } from "./LikesContext";

export default function StatsBar({ price }) {
  const { totalLikes } = useLikesContext();

  return (
    <aside className={styles.stats} aria-label="Statistiques photographe">
      <span className={styles.statsLikes}>
        {totalLikes} ♥
      </span>
      <span className={styles.statsPrice}>{price}€ / jour</span>
    </aside>
  );
}
