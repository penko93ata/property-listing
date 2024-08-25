"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSessionUser } from "./getSessionUser";
import prisma from "@/lib/db";
import { PropertyAddFormSchema, TPropertyEditFormState } from "@/types/properties.types";

export async function updateProperty(propertyId: string, data: TPropertyEditFormState) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;
  const parsedData = PropertyAddFormSchema.safeParse(data);

  if (!parsedData.success) {
    const fields: Record<string, string> = {};
    // for (const key of Object.keys(formData)) {
    //   fields[key] = formData[key].toString();
    // }
    return {
      message: "Invalid form data",
      fields,
      issues: parsedData.error.issues.map((issue) => issue.message),
    };
  }

  const existingProperty = await prisma.properties.findUnique({
    where: { id: propertyId },
  });

  // Verify ownership
  if (existingProperty?.owner !== userId) {
    throw new Error("Current user is not the owner of this property");
  }

  const updatedProperty = {
    data: {
      ...parsedData.data,
      beds: parseNumberEmptyString(data.beds),
      baths: parseNumberEmptyString(data.baths),
      square_feet: parseNumberEmptyString(data.square_feet),
      rates: {
        weekly: parseNumberEmptyString(data.rates.weekly),
        nightly: parseNumberEmptyString(data.rates.nightly),
        monthly: parseNumberEmptyString(data.rates.monthly),
      },
      amenities: data.amenities,
      owner: userId.toString(),
      description: data.description ? data.description : "",
    },
  };

  const response = await prisma.properties.update({
    where: { id: propertyId },
    data: updatedProperty.data,
  });

  revalidatePath("/", "layout");
  redirect(`/properties/${response.id}`);
}

function parseNumberEmptyString(value: string | number | undefined): number {
  if (value === undefined || value === "") {
    return 0;
  }

  return Number(value);
}