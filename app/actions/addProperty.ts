"use server";
// TODO - Remove type
// import { FormStateResponse } from "@/types/form.types";
import { PropertyAddFormSchema, TPropertyAddFormParsedState, TPropertyAddFormState } from "@/types/properties.types";
import { getSessionUser } from "./getSessionUser";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import cloudinary from "@/config/cloudinary";

export async function onAddPropertySubmit(data: TPropertyAddFormState, formData: FormData) {
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

  const imageUrls = [];

  const images = formData.getAll("images") as File[];

  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    // Convert to base64
    const imageBase64 = imageData.toString("base64");

    // Make request to cloudinary
    const response = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
      folder: "property-listing",
    });

    imageUrls.push(response.secure_url);
  }

  const newProperty = {
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
      images: imageUrls,
    },
  };

  const response = await prisma.properties.create(newProperty);

  revalidatePath("/", "layout");
  return redirect(`${process.env.NEXTAUTH_URL}/properties/${response.id}`);
}

function parseNumberEmptyString(value: string | number | undefined): number {
  if (value === undefined || value === "") {
    return 0;
  }

  return Number(value);
}
