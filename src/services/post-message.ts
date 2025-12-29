import { prisma } from "../../lib/prisma.ts";

export async function postMessageService(data: string) {
  return await prisma.message.create({
    data: { content: data },
  });
}
