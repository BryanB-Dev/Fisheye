"use client";

import Image from "next/image";
import styles from "./page.module.css";
import LikeButton from "../../components/LikeButton";
import LightboxTrigger from "./LightboxTrigger";

export default function MediaCard({ media, mediaList, mediaIndex }) {
  return (
    <article className={styles.mediaCard}>
      <LightboxTrigger
        mediaList={mediaList}
        mediaIndex={mediaIndex}
      >
        <div className={styles.mediaThumb}>
          {media.image ? (
            <Image
              src={`/${media.image}`}
              alt={media.title}
              width={350}
              height={300}
              className={styles.mediaImage}
            />
          ) : (
            <video
              className={styles.mediaVideo}
              muted
              playsInline
              aria-label={media.title}
            >
              <source src={`/${media.video}`} />
            </video>
          )}
        </div>
      </LightboxTrigger>
      <div className={styles.mediaMeta}>
        <h2 className={styles.mediaTitle}>{media.title}</h2>
        <LikeButton 
          mediaId={media.id} 
          initialLikes={media.likes}
        />
      </div>
    </article>
  );
}
