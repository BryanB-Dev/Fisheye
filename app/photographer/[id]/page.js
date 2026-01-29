import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import ContactModalTrigger from "./ContactModalTrigger";
import PhotographerContent from "./PhotographerContent";
import StatsBar from "./StatsBar";
import { LikesProvider } from "./LikesContext";
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
    <LikesProvider initialTotalLikes={totalLikes}>
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
            <ContactModalTrigger photographerName={photographer.name} />
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

          <PhotographerContent medias={medias} />
        </main>

        <StatsBar price={photographer.price} />
      </div>
    </LikesProvider>
  );
}
