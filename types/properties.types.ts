import { z } from "zod";

export const PropertyRatesSchema = z.object({
  // TODO - Figure out correct zod type here
  weekly: z.coerce.number().or(z.string()),
  monthly: z.coerce.number().or(z.string()).optional(),
  nightly: z.coerce.number().or(z.string()).optional(),
});

export const PropertyAddFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: getErrorMessages().min(2) }),
  type: z.string().min(2, { message: getErrorMessages().min(2) }),
  description: z
    .string()
    .trim()
    .min(2, { message: getErrorMessages().min(10) })
    .optional(),
  location: z.object({
    street: z
      .string()
      .trim()
      .min(2, { message: getErrorMessages().min(2) }),
    city: z
      .string()
      .trim()
      .min(2, { message: getErrorMessages().min(2) }),
    state: z
      .string()
      .trim()
      .min(2, { message: getErrorMessages().min(2) }),
    zipcode: z
      .string()
      .trim()
      .min(2, { message: getErrorMessages().min(2) }),
  }),
  beds: z.coerce.number().or(z.string()),
  baths: z.coerce.number().or(z.string()),
  square_feet: z.coerce.number().or(z.string()),
  amenities: z.array(z.string()).optional(),
  rates: PropertyRatesSchema,
  seller_info: z.object({
    name: z
      .string()
      .trim()
      .min(2, { message: getErrorMessages().min(2) }),
    phone: z.string().min(2, { message: getErrorMessages().min(2) }),
    email: z.string().email().trim(),
  }),
  images: z.array(z.string()),
  isFeatured: z.boolean().optional(),
});

export const PropertyGetSchema = PropertyAddFormSchema.extend({
  id: z.string().regex(/^[0-9a-f]{24}$/),
  owner: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const PropertiesGetSchema = z.array(PropertyGetSchema);

export type TPropertyAddFormState = z.infer<typeof PropertyAddFormSchema>;
export type TPropertyRates = z.infer<typeof PropertyRatesSchema>;
export type TProperty = z.infer<typeof PropertyGetSchema>;

function getErrorMessages() {
  return {
    min: (minLength: number) => `Field must be at least ${minLength} characters long`,
  };
}
