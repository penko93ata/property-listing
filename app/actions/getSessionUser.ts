"use server";

import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export async function getSessionUser() {
  console.log("get session user");
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return null;
    }

    return {
      user: session.user,
      userId: session.user.id,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
