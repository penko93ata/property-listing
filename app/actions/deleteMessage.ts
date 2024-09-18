"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getSessionUserId } from "./getSessionUserId";

export async function deleteMessage(messageId: string) {
  const { userId } = await getSessionUserId();

  const message = await prisma.messages.findUnique({
    where: {
      id: messageId,
    },
  });

  if (!message) throw new Error("Message not found");

  if (message.recipient.toString() !== userId) {
    throw new Error("You are not authorized to mark this message as read");
  }

  await prisma.messages.delete({
    where: {
      id: messageId,
    },
  });

  revalidatePath("/", "layout");
}
