import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import {
  getAllMediasForPhotographer,
  getPhotographer,
} from "../../lib/prisma-db";

export default async function PhotographerPage({ params }) {
  const { id } = await params;
  const photographerId = Number(id);

  if (Number.isNaN(photographerId)) {
    notFound();
  }

  const photographer = await getPhotographer(photographerId);

  if (!photographer) {
    notFound();
  }

  const medias = await getAllMediasForPhotographer(photographerId);
  const totalLikes = medias.reduce((sum, media) => sum + media.likes, 0);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Retour à l'accueil">
          FishEye
        </Link>
      </header>

      <main className={styles.main}>
        <section className={styles.profile} aria-label="Profil photographe">
          <div className={styles.profileInfo}>
            <h1 className={styles.name}>{photographer.name}</h1>
            <p className={styles.location}>
              {photographer.city}, {photographer.country}
            </p>
            <p className={styles.tagline}>{photographer.tagline}</p>
          </div>
          <button type="button" className={styles.contactButton}>
            Contactez-moi
          </button>
          <div className={styles.avatarWrapper}>
            <Image
              src={`/${photographer.portrait}`}
              alt={photographer.name}
              width={200}
              height={200}
              className={styles.avatar}
              priority
            />
          </div>
        </section>

        <section className={styles.sortBar} aria-label="Tri des médias">
          <span className={styles.sortLabel}>Trier par</span>
          <button type="button" className={styles.sortButton}>
            Popularité
          </button>
        </section>

        <section className={styles.mediaSection} aria-label="Galerie">
          <div className={styles.mediaGrid}>
            {medias.map((media) => (
              <article key={media.id} className={styles.mediaCard}>
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
                <div className={styles.mediaMeta}>
                  <h2 className={styles.mediaTitle}>{media.title}</h2>
                  <span className={styles.mediaLikes} aria-label={`${media.likes} likes`}>
                    {media.likes}
                    <span aria-hidden="true" className={styles.heart}>
                      ♥
                    </span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <aside className={styles.stats} aria-label="Statistiques photographe">
        <span className={styles.statsLikes}>
          {totalLikes} ♥
        </span>
        <span className={styles.statsPrice}>{photographer.price}€ / jour</span>
      </aside>
    </div>
  );
}
