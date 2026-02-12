"use client";

export default function Error({ reset }) {
  return (
    <main role="alert" style={{ padding: "2rem" }}>
      <p>Une erreur est survenue lors du chargement.</p>
      <button type="button" onClick={() => reset()}>
        Réessayer
      </button>
    </main>
  );
}
