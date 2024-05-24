"use server";

import { PropertyAddFormSchema } from "@/types/properties.types";

export async function onSubmitAction(_prevState: unknown, data: FormData): Promise<unknown> {
  const formData = Object.fromEntries(data);
  const parsedData = PropertyAddFormSchema.safeParse(formData);

  if (!parsedData.success) {
    // TODO - error handling
  }

  return { message: "Property Added Successfully" };
}
