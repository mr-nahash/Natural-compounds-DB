import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

if (!global.prisma) {
  global.prisma = prisma;
}

const client = global.prisma;

if (process.env.NODE_ENV !== "production") {
  global.prisma = client;
}

export default prisma;