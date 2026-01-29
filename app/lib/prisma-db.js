import { PrismaClient } from "../../generated/prisma/client.ts";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const globalForPrisma = globalThis;

const prismaClient =
  globalForPrisma.__prismaClient ||
  new PrismaClient({
    adapter: new PrismaBetterSqlite3({
      url: process.env.DATABASE_URL || "file:./dev.db",
    }),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__prismaClient = prismaClient;
}

export const getAllPhotographers = () => prismaClient.photographer.findMany();

export const getPhotographer = (id) =>
  prismaClient.photographer.findUnique({
    where: { id },
  });

export const getAllMediasForPhotographer = (photographerId) =>
  prismaClient.media.findMany({
    where: { photographerId },
  });

export const updateNumberOfLikes = (mediaId, newNumberOfLikes) =>
  prismaClient.media.update({
    where: { id: mediaId },
    data: { likes: newNumberOfLikes },
  });
