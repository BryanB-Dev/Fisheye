"use client";

export default function PhotographerError({ reset }) {
  return (
    <main role="alert" style={{ padding: "2rem" }}>
      <p>Impossible de charger cette page photographe.</p>
      <button type="button" onClick={() => reset()}>
        Réessayer
      </button>
    </main>
  );
}
