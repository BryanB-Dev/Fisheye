import { PrismaClient } from '../generated/prisma/client.ts';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import photographers from '../data/photographer.json' with { type: 'json' };
import medias from '../data/media.json' with { type: 'json' };

const adapter = new PrismaBetterSqlite3({
  url: 'file:./dev.db',
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
    await prisma.photographer.createMany({
        data: photographers
    });

    await prisma.media.createMany({
        data: medias // content from ./data/media.json
    });
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })