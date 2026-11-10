import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  const databaseUrl = process.env.DATABASE_URL || "mysql://root:password@localhost:3306/zymi_db";

  try {
    const url = new URL(databaseUrl);
    if (process.env.NODE_ENV === "development") {
      console.log(`Database target: ${url.protocol}//${url.hostname}:${url.port || '3306'}`);
    }
  } catch {
    // Graceful fallback for non-standard connection strings
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
