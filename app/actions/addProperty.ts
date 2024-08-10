"use server";
// TODO - Remove type
// import { FormStateResponse } from "@/types/form.types";
import { PropertyAddFormSchema, TPropertyAddFormState } from "@/types/properties.types";
import { getSessionUser } from "./getSessionUser";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function onAddPropertySubmit(data: TPropertyAddFormState) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return {
      message: "User ID is required",
    };
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

  console.log({
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
      images: data.images,
      amenities: data.amenities,
      owner: userId.toString(),
      description: data.description ? data.description : "",
    },
  });

  const newProperty = await prisma.properties.create({
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
      images: data.images,
      amenities: data.amenities,
      owner: userId.toString(),
      description: data.description ? data.description : "",
    },
  });
  revalidatePath("/", "layout");
  return redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty.id}`);
}

function parseNumberEmptyString(value: string | number | undefined): number {
  if (value === undefined || value === "") {
    return 0;
  }

  return Number(value);
}
