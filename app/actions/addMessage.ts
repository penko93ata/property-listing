"use server";

import { AddMessageSchema, TAddMessageFormState } from "@/types/messages.types";
import { getSessionUser } from "./getSessionUser";
import prisma from "@/lib/db";

export type TAddMessageSubmitProps = {
  data: TAddMessageFormState;
  property: string;
  recipient: string;
};

export async function addMessage({ data, property, recipient }: TAddMessageSubmitProps) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const parsedData = AddMessageSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      message: "Invalid form data",
      issues: parsedData.error.issues.map((issue) => issue.message),
    };
  }

  // Send message to database
  if (userId === recipient) {
    return { error: "You cannot send a message to yourself" };
  }

  const response = await prisma.messages.create({
    data: {
      sender: userId,
      recipient,
      property,
      name: data.name,
      email: data.email,
      phone: data.phone,
      body: data.message,
    },
  });

  return { submitted: true };
}
