"use server";
import { revalidatePath } from "next/cache";
import cloudinary from "@/config/cloudinary";
import prisma from "@/lib/db";
import { getSessionUserId } from "./getSessionUserId";

export async function deleteProperty(propertyId: string) {
  const { userId } = await getSessionUserId();

  const property = await prisma.properties.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    throw new Error("Property not found");
  }

  // Verify ownership
  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  await prisma.properties.delete({ where: { id: property.id } });

  // Extract public_id from image URLs
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split("/");
    return parts.at(-1)?.split(".").at(0);
  });

  // Delete images from Cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy("property-listing/" + publicId);
    }
  }

  revalidatePath("/", "layout");
}
