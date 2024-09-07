import { getErrorMessages } from "@/utils/getErrroMessages";
import { z } from "zod";
import { PropertyGetSchema, TProperty } from "./properties.types";

const { required } = getErrorMessages();

export const AddMessageSchema = z.object({
  name: z.string().trim().min(1, { message: required }),
  email: z.string().email().trim().min(1, { message: required }),
  phone: z.string().min(1, { message: required }),
  message: z.string().trim().min(1, { message: required }),
});

export type TAddMessageFormState = z.infer<typeof AddMessageSchema>;
