import { getErrorMessages } from "@/utils/getErrroMessages";
import { z } from "zod";

const { required } = getErrorMessages();

export const AddMessageSchema = z.object({
  name: z.string().trim().min(1, { message: required }),
  email: z.string().email().trim().min(1, { message: required }),
  phone: z.string().min(1, { message: required }),
  body: z.string().trim().min(1, { message: required }),
});

export const GetMessageSchema = AddMessageSchema.extend({
  id: z.string().regex(/^[0-9a-f]{24}$/),
  recipient: z.string().regex(/^[0-9a-f]{24}$/),
  property: z.string().regex(/^[0-9a-f]{24}$/),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TAddMessageFormState = z.infer<typeof AddMessageSchema>;
export type TMessage = z.infer<typeof GetMessageSchema>;
