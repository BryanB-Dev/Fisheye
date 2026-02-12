import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { getAllPhotographers } from "./lib/prisma-db";

export default async function Home() {
  const photographers = await getAllPhotographers();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Fisheye Home page">
          <span className={styles.brandText}>FishEye</span>
        </Link>
        <h1 className={styles.title}>Nos photographes</h1>
      </header>

      <main className={styles.main}>
        <section className={styles.grid} aria-label="Liste des photographes">
          {photographers.map((photographer) => (
            <article key={photographer.id} className={styles.card}>
              <Link className={styles.cardLink} href={`/photographer/${photographer.id}`}>
                <div className={styles.avatarWrapper}>
                  <Image
                    src={`/${photographer.portrait}`}
                    alt=""
                    width={200}
                    height={200}
                    className={styles.avatar}
                    priority={photographer.id === photographers[0]?.id}
                  />
                </div>
                <h2 className={styles.name}>{photographer.name}</h2>
              </Link>
              <p className={styles.location}>
                {photographer.city}, {photographer.country}
              </p>
              <p className={styles.tagline}>{photographer.tagline}</p>
              <p className={styles.price}>{photographer.price}€/jour</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
