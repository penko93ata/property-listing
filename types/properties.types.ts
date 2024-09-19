import { getErrorMessages } from "@/utils/getErrroMessages";
import { z } from "zod";

const { required, min } = getErrorMessages();

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const getOptionalNumberSchema = () =>
  z
    .union([
      z.coerce
        .number()
        .int({
          message: "must be a whole number",
        })
        .gte(0),
      z.literal(""),
    ])
    .optional();

const getRequiredNumberSchema = () =>
  z.union([
    z.coerce
      .number()
      .int({
        message: "must be a whole number",
      })
      .gte(1, { message: required }),
    z.literal("").refine(() => false, {
      message: "is required",
    }),
  ]);

export const PropertyRatesSchema = z.object({
  weekly: getRequiredNumberSchema(),
  monthly: getOptionalNumberSchema(),
  nightly: getOptionalNumberSchema(),
});

export const PropertyAddFormSchema = z.object({
  name: z.string().trim().min(1, { message: required }),
  type: z.string().min(1, { message: required }),
  description: z
    .string()
    .trim()
    .min(1, { message: min(10) })
    .optional(),
  location: z.object({
    street: z.string().trim().min(1, { message: required }),
    city: z.string().trim().min(1, { message: required }),
    state: z.string().trim().min(1, { message: required }),
    zipcode: z.string().trim().min(1, { message: required }),
  }),
  beds: getRequiredNumberSchema(),
  baths: getRequiredNumberSchema(),
  square_feet: getRequiredNumberSchema(),
  amenities: z.array(z.string()).optional(),
  rates: PropertyRatesSchema,
  seller_info: z.object({
    name: z.string().trim().min(1, { message: required }),
    phone: z.string().min(1, { message: required }),
    email: z.string().email().trim(),
  }),
  images: z
    .any()
    // To not allow empty files
    .refine((files: File[]) => files?.length >= 1, { message: "At least one image is required" })
    .refine((files: File[]) => files?.length <= 4, { message: "Maximum of 4 images allowed" })
    // To not allow files other than images
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: ".jpg, .jpeg, .png and .webp files are accepted.",
    })
    // To not allow files larger than 5MB
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `Max file size is 5MB.`,
    }),
  isFeatured: z.boolean().optional(),
});

export const PropertyGetSchema = PropertyAddFormSchema.extend({
  id: z.string().regex(/^[0-9a-f]{24}$/),
  owner: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  images: z.array(z.string()),
});

export const PropertiesGetSchema = z.array(PropertyGetSchema.extend({ images: z.array(z.string()) }));

export type TPropertyAddFormState = z.infer<typeof PropertyAddFormSchema>;
export type TPropertyEditFormState = TPropertyAddFormState & { id?: string };
export type TPropertyRates = z.infer<typeof PropertyRatesSchema>;
export type TProperty = z.infer<typeof PropertyGetSchema>;

export const PropertySearchSchema = z.object({
  location: z.string().optional(),
  propertyType: z.string().optional(),
});

export type TPropertySearchFormState = z.infer<typeof PropertySearchSchema>;
