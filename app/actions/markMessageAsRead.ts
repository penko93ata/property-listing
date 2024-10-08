"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getSessionUserId } from "./getSessionUserId";

export async function markMessageAsRead(messageId: string) {
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

  const response = await prisma.messages.update({
    where: {
      id: messageId,
    },
    data: {
      read: !message.read,
    },
  });

  revalidatePath("/messages", "page");

  return response.read;
}
