import { prisma } from "../../lib/prisma.ts";

export async function getMessagesService() {
  return await prisma.message.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}
