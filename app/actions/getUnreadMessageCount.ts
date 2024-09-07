"use server";

import prisma from "@/lib/db";
import { getSessionUser } from "./getSessionUser";

export async function getUnreadMessageCount() {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const count = await prisma.messages.count({
    where: {
      recipient: userId,
      read: false,
    },
  });

  return { count };
}
