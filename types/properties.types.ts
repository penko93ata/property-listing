import { z } from "zod";

export const PropertyRatesSchema = z.object({
  weekly: z.number().optional(),
  monthly: z.number().optional(),
  nightly: z.number().optional(),
});

export const PropertyAddFormSchema = z.object({
  name: z.string().min(2, { message: getErrorMessages().min(2) }),
  type: z.string().min(2, { message: getErrorMessages().min(2) }),
  description: z.string().min(2, { message: getErrorMessages().min(10) }),
  location: z.object({
    street: z.string().min(2, { message: getErrorMessages().min(2) }),
    city: z.string().min(2, { message: getErrorMessages().min(2) }),
    state: z.string().min(2, { message: getErrorMessages().min(2) }),
    zipcode: z.string().min(2, { message: getErrorMessages().min(2) }),
  }),
  beds: z.number(),
  baths: z.number(),
  square_feet: z.number(),
  amenities: z.array(z.string()).optional(),
  rates: PropertyRatesSchema,
  seller_info: z.object({
    name: z.string().min(2, { message: getErrorMessages().min(2) }),
    phone: z.string().min(2, { message: getErrorMessages().min(2) }),
    email: z.string().email(),
  }),
  images: z.array(z.string()),
  isFeatured: z.boolean().optional(),
});

export const PropertyGetSchema = PropertyAddFormSchema.extend({
  id: z.string().uuid(),
  owner: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
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
