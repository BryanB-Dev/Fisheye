import photographers from "../../data/photographer.json" with { type: "json" };
import medias from "../../data/media.json" with { type: "json" };

const globalForPrisma = globalThis;
let prismaClientPromise;

const fallbackMedias = medias.map((media, index) => ({
  ...media,
  id: index + 1,
}));

const fallbackLikesMap = new Map(
  fallbackMedias.map((media) => [media.id, media.likes])
);

const isSqliteUnavailableError = (error) => {
  if (!error) return false;

  return (
    error.code === "SQLITE_CANTOPEN" ||
    String(error.message || "").toLowerCase().includes("unable to open database file")
  );
};

const getPrismaClient = async () => {
  if (prismaClientPromise) {
    return prismaClientPromise;
  }

  prismaClientPromise = (async () => {
    try {
      const { PrismaClient } = await import("../../generated/prisma/client.ts");
      const { PrismaBetterSqlite3 } = await import("@prisma/adapter-better-sqlite3");

      const existingClient = globalForPrisma.__prismaClient;
      if (existingClient) {
        return existingClient;
      }

      const client = new PrismaClient({
        adapter: new PrismaBetterSqlite3({
          url: process.env.DATABASE_URL || "file:./dev.db",
        }),
      });

      if (process.env.NODE_ENV !== "production") {
        globalForPrisma.__prismaClient = client;
      }

      return client;
    } catch {
      return null;
    }
  })();

  return prismaClientPromise;
};

export const getAllPhotographers = async () => {
  const prismaClient = await getPrismaClient();
  if (!prismaClient) {
    return photographers;
  }

  try {
    return await prismaClient.photographer.findMany();
  } catch (error) {
    if (isSqliteUnavailableError(error)) {
      return photographers;
    }
    throw error;
  }
};

export const getPhotographer = async (id) => {
  const prismaClient = await getPrismaClient();
  if (!prismaClient) {
    return photographers.find((photographer) => photographer.id === id) || null;
  }

  try {
    return await prismaClient.photographer.findUnique({
      where: { id },
    });
  } catch (error) {
    if (isSqliteUnavailableError(error)) {
      return photographers.find((photographer) => photographer.id === id) || null;
    }
    throw error;
  }
};

export const getAllMediasForPhotographer = async (photographerId) => {
  const prismaClient = await getPrismaClient();
  if (!prismaClient) {
    return fallbackMedias.filter((media) => media.photographerId === photographerId);
  }

  try {
    return await prismaClient.media.findMany({
      where: { photographerId },
    });
  } catch (error) {
    if (isSqliteUnavailableError(error)) {
      return fallbackMedias.filter((media) => media.photographerId === photographerId);
    }
    throw error;
  }
};

export const updateNumberOfLikes = async (mediaId, newNumberOfLikes) => {
  const prismaClient = await getPrismaClient();
  if (!prismaClient) {
    const media = fallbackMedias.find((item) => item.id === mediaId);
    if (!media) {
      throw new Error(`Media with id ${mediaId} not found`);
    }

    fallbackLikesMap.set(mediaId, newNumberOfLikes);
    return { ...media, likes: newNumberOfLikes };
  }

  try {
    return await prismaClient.media.update({
      where: { id: mediaId },
      data: { likes: newNumberOfLikes },
    });
  } catch (error) {
    if (!isSqliteUnavailableError(error)) {
      throw error;
    }

    const media = fallbackMedias.find((item) => item.id === mediaId);
    if (!media) {
      throw new Error(`Media with id ${mediaId} not found`);
    }

    fallbackLikesMap.set(mediaId, newNumberOfLikes);
    return { ...media, likes: newNumberOfLikes };
  }
};

export const incrementMediaLike = async (mediaId) => {
  const prismaClient = await getPrismaClient();
  if (!prismaClient) {
    const media = fallbackMedias.find((item) => item.id === mediaId);
    if (!media) {
      throw new Error(`Media with id ${mediaId} not found`);
    }

    const currentLikes = fallbackLikesMap.get(mediaId) ?? media.likes;
    const updatedLikes = currentLikes + 1;
    fallbackLikesMap.set(mediaId, updatedLikes);

    return { ...media, likes: updatedLikes };
  }

  try {
    const media = await prismaClient.media.findUnique({
      where: { id: mediaId },
    });

    if (!media) {
      throw new Error(`Media with id ${mediaId} not found`);
    }

    return await prismaClient.media.update({
      where: { id: mediaId },
      data: { likes: media.likes + 1 },
    });
  } catch (error) {
    if (!isSqliteUnavailableError(error)) {
      throw error;
    }

    const media = fallbackMedias.find((item) => item.id === mediaId);
    if (!media) {
      throw new Error(`Media with id ${mediaId} not found`);
    }

    const currentLikes = fallbackLikesMap.get(mediaId) ?? media.likes;
    const updatedLikes = currentLikes + 1;
    fallbackLikesMap.set(mediaId, updatedLikes);

    return { ...media, likes: updatedLikes };
  }
};
