"use client";

import { useState } from "react";
import { useLikesContext } from "../photographer/[id]/LikesContext";
import styles from "../photographer/[id]/page.module.css";

export default function LikeButton({ mediaId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLoading, setIsLoading] = useState(false);
  const { updateTotalLikes } = useLikesContext();

  const handleLike = async (e) => {
    e.stopPropagation();
    
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch(`/api/media/${mediaId}/like`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to like media");
      }

      const data = await response.json();
      const increment = data.likes - likes;
      setLikes(data.likes);
      updateTotalLikes(increment);
    } catch (error) {
      console.error("Error liking media:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
      className={styles.likeButton}
      aria-label={`Like this media, ${likes} likes`}
    >
      <span className={styles.likeCount}>{likes}</span>
      <span className={styles.likeHeart} aria-hidden="true">
        ♥
      </span>
    </button>
  );
}
