"use server";

import { FormStateResponse } from "@/types/form.types";
import { PropertyAddFormSchema } from "@/types/properties.types";
import { getSessionUser } from "./getSessionUser";

export async function onAddPropertySubmit(_prevState: FormStateResponse, data: FormData): Promise<FormStateResponse> {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return {
      message: "User ID is required",
    };
  }

  // TODO - Set the user ID to the owner field when creating a property
  const { userId } = sessionUser;
  const formData = Object.fromEntries(data);
  const parsedData = PropertyAddFormSchema.safeParse(formData);

  console.log("test submit action");
  console.log({ formData, parsedData });

  if (!parsedData.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }
    return {
      message: "Invalid form data",
      fields,
      issues: parsedData.error.issues.map((issue) => issue.message),
    };
  }

  // TODO - Use Prisma to add the property to the database
  return { message: "Property Added Successfully" };
}
