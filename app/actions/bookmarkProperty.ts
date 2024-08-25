"use server";

import prisma from "@/lib/db";
import { getSessionUser } from "./getSessionUser";
import { revalidatePath } from "next/cache";

export async function bookmarkProperty(propertyId: string) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User not authenticated");
  }

  const { userId } = sessionUser;

  const user = await prisma.users.findUnique({ where: { id: userId } });

  //   let isBookmarked = user?.bookmarks.includes(propertyId);

  //   let message = "";

  //   if (isBookmarked) {
  //     user.bookmarks.pull(propertyId);
  //     message = "Bookmark removed";
  //     isBookmarked = false;
  //   } else {
  //     user.bookmarks.push(propertyId);
  //     message = "Bookmark added";
  //     isBookmarked = true;
  //   }

  //   await prisma.users.update({ data: user });
  //   revalidatePath("/properties/saved", "page");

  //   return { message, isBookmarked };
}
