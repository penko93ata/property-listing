"use server";

import prisma from "@/lib/db";
import { getSessionUserId } from "./getSessionUserId";

export async function getUnreadMessageCount() {
  const { userId } = await getSessionUserId();

  const count = await prisma.messages.count({
    where: {
      recipient: userId,
      read: false,
    },
  });

  return { count };
}
