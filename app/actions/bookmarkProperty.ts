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

  const user = await prisma.users.findUnique({
    where: { id: userId },
    select: { bookmarks: true },
  });

  let isBookmarked = user?.bookmarks?.includes(propertyId) ?? false;
  let message = "";

  if (isBookmarked) {
    await prisma.users.update({
      where: { id: userId },
      data: {
        bookmarks: user?.bookmarks.filter((bookmark) => bookmark !== propertyId),
      },
    });
    message = "Bookmark removed";
    isBookmarked = false;
  } else {
    const updatedBookmarks = [...(user?.bookmarks.map((bookmarkProperty) => bookmarkProperty.toString()) ?? []), propertyId.toString()];
    await prisma.users.update({
      where: { id: userId },
      data: {
        bookmarks: updatedBookmarks,
      },
    });
    message = "Bookmark added";
    isBookmarked = true;
  }

  revalidatePath("/properties/saved", "page");

  return { message, isBookmarked };
}

export async function isPropertyBookmarked(propertyId: string) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return false;
  }

  const { userId } = sessionUser;

  const user = await prisma.users.findUnique({
    where: { id: userId },
    select: { bookmarks: true },
  });

  return user?.bookmarks?.includes(propertyId) ?? false;
}
