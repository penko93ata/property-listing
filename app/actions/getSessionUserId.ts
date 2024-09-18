"use server";

import { getSessionUser } from "./getSessionUser";

export async function getSessionUserId() {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  return { userId: sessionUser.userId };
}
