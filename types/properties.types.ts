import { getErrorMessages } from "@/utils/getErrroMessages";
import { optional, z } from "zod";

const { required, min } = getErrorMessages();

// const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
// const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
// const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

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
      .gte(0),
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
  // images: z
  //   .array(z.instanceof(File))
  //   .min(1, { message: "At least one image is required" })
  //   .max(4, { message: "Maximum of 4 images allowed" })
  //   .refine(
  //     (files) => {
  //       // Check if all items in the array are instances of the File object
  //       return files.every((file) => file instanceof File);
  //     },
  //     {
  //       // If the refinement fails, throw an error with this message
  //       message: "Expected a file",
  //     }
  //   ),
  //   .refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE), `File size should be less than ${MAX_FILE_SIZE}mb.`),
  // images: z
  //   .instanceof(FileList)
  //   .refine((files) => files.length > 0, { message: "At least one image is required" })
  //   .refine((files) => files.length <= 4, { message: "Maximum of 4 images allowed" }),
  images: z.any(),
  isFeatured: z.boolean().optional(),
});

export const PropertyAddParsedSchema = PropertyAddFormSchema.extend({
  images: z.array(z.string()).min(1, { message: "At least one image is required" }).max(4, { message: "Maximum of 4 images allowed" }),
  owner: z.string(),
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
export type TPropertyAddFormParsedState = z.infer<typeof PropertyAddParsedSchema>;
export type TPropertyRates = z.infer<typeof PropertyRatesSchema>;
export type TProperty = z.infer<typeof PropertyGetSchema>;

// z.array(
//   z
//     .instanceof(File)
//     .refine((file) => !file || file.size <= MAX_UPLOAD_SIZE, `File must be less than ${MAX_UPLOAD_SIZE}MB`)
//     .transform((file) => file.name)
// ),

// z
//     .array(z.custom<File>())
//     .refine(
//       (files) => {
//         // Check if all items in the array are instances of the File object
//         return files.every((file) => file instanceof File);
//       },
//       {
//         // If the refinement fails, throw an error with this message
//         message: "Expected a file",
//       }
//     )
//     .refine((files) => files.every((file) => file.size <= MAX_UPLOAD_SIZE), `File size should be less than ${MAX_UPLOAD_SIZE}mb.`)
//     .transform((files) => files.map((file) => file.name))

export const PropertySearchSchema = z.object({
  location: z.string().optional(),
  propertyType: z.string().optional(),
});

export type TPropertySearchFormState = z.infer<typeof PropertySearchSchema>;
