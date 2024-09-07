import { AddMessageSchema, TAddMessageFormState } from "@/types/messages.types";
import { TPropertyAddFormState, TPropertySearchFormState } from "@/types/properties.types";
import { z } from "zod";

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

export function getPropertyEditFormDefaultValues(property: TPropertyAddFormState) {
  return {
    ...property,
    rates: {
      weekly: property.rates.weekly,
      monthly: property.rates.monthly,
      nightly: property.rates.nightly,
    },
  };
}

export const defaultPropertySearchFormValues: TPropertySearchFormState = {
  location: "",
  propertyType: "All",
};

export const defaultMessageFormValues: TAddMessageFormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};
