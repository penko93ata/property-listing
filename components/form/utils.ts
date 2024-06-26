import { TPropertyAddFormState } from "@/types/properties.types";

export const propertyAddFormDefaultValues: TPropertyAddFormState = {
  type: "Apartment",
  name: "",
  description: "",
  location: {
    street: "",
    city: "",
    state: "",
    zipcode: "",
  },
  beds: "",
  baths: "",
  square_feet: "",
  amenities: [],
  rates: {
    weekly: "",
    monthly: "",
    nightly: "",
  },
  seller_info: {
    name: "",
    email: "",
    phone: "",
  },
  images: [],
};
