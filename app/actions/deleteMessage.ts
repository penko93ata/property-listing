"use server";

import prisma from "@/lib/db";
import { getSessionUser } from "./getSessionUser";
import { revalidatePath } from "next/cache";

export async function deleteMessage(messageId: string) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

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
