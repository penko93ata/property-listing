import { z } from "zod";

export type Property = {
  id: string;
  owner: string;
  name: string;
  type: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: Rates;
  seller_info: {
    name: string;
    phone: string;
    email: string;
  };
  images: string[];
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Rates = {
  weekly?: number;
  monthly?: number;
  nightly?: number;
};

const PropertyAddFormSchema = z.object({
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
  rates: z.object({
    weekly: z.number().optional(),
    monthly: z.number().optional(),
    nightly: z.number().optional(),
  }),
  seller_info: z.object({
    name: z.string().min(2, { message: getErrorMessages().min(2) }),
    phone: z.string().min(2, { message: getErrorMessages().min(2) }),
    email: z.string().email(),
  }),
  images: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
});

export type TPropertyAddFormValues = z.infer<typeof PropertyAddFormSchema>;
export interface IProperty extends TPropertyAddFormValues {
  id: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

function getErrorMessages() {
  return {
    min: (minLength: number) => `Field must be at least ${minLength} characters long`,
  };
}
