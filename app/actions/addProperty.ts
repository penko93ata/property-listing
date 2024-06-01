"use server";
// TODO - Remove type
// import { FormStateResponse } from "@/types/form.types";
import { PropertyAddFormSchema, TPropertyAddFormState } from "@/types/properties.types";
import { getSessionUser } from "./getSessionUser";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

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

  const newProperty = await prisma.properties.create({
    data: {
      ...parsedData.data,
      beds: data.beds ? data.beds : 0,
      baths: data.baths ? data.baths : 0,
      square_feet: data.square_feet ? data.square_feet : 0,
      rates: {
        weekly: data.rates.weekly ? data.rates.weekly : 0,
        nightly: data.rates.nightly ? data.rates.nightly : 0,
        monthly: data.rates.monthly ? data.rates.monthly : 0,
      },
      owner: userId.toString(),
      description: data.description ? data.description : "",
    },
  });
  return redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty.id}`);
}
