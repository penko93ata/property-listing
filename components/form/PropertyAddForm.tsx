"use client";
import { PropertyAddFormSchema, TPropertyAddFormState } from "@/types/properties.types";
import { Button } from "../ui/button";
import { Form } from "./Form";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";
import { Label } from "../ui/label";
import { FormCheckboxGroup } from "./FormCheckboxGroup";
import { propertyAddFormDefaultValues } from "./utils";
import { onAddPropertySubmit } from "@/app/actions/addProperty";
import { useFormContext, useFormState } from "react-hook-form";

const propetyTypeOptions = [
  { value: "Apartment", label: "Apartment" },
  { value: "Studio", label: "Studio" },
  { value: "Condo", label: "Condo" },
  { value: "House", label: "House" },
  { value: "Cabin Or Cottage", label: "Cabin Or Cottage" },
  { value: "Loft", label: "Loft" },
  { value: "Room", label: "Room" },
  { value: "Other", label: "Other" },
];

const amenitiesItems = [
  { id: "amenity_wifi", label: "Wifi" },
  { id: "amenity_kitchen", label: "Full Kitchen" },
  { id: "amenity_washer_dryer", label: "Washer & Dryer" },
  { id: "amenity_free_parking", label: "Free Parking" },
  { id: "amenity_pool", label: "Swimming Pool" },
  { id: "amenity_hot_tub", label: "Hot Tub" },
  { id: "amenity_24_7_security", label: "24/7 Security" },
  { id: "amenity_wheelchair_accessible", label: "Wheelchair Accessible" },
  { id: "amenity_elevator_access", label: "Elevator Access" },
  { id: "amenity_dishwasher", label: "Dishwasher" },
  { id: "amenity_gym_fitness_center", label: "Gym/Fitness Center" },
  { id: "amenity_air_conditioning", label: "Air Conditioning" },
  { id: "amenity_balcony_patio", label: "Balcony/Patio" },
  { id: "amenity_smart_tv", label: "Smart TV" },
  { id: "amenity_coffee_maker", label: "Coffee Maker" },
];

export default function PropertyAddForm() {
  return (
    <Form<TPropertyAddFormState>
      schema={PropertyAddFormSchema}
      defaultValues={propertyAddFormDefaultValues}
      onSubmitAction={onAddPropertySubmit}
      className='flex flex-col gap-4'
      encType='multipart/form-data'
    >
      <PropertyAddFormContent />
    </Form>
  );
}

function PropertyAddFormContent() {
  const { control, getValues } = useFormContext<TPropertyAddFormState>();
  const { errors } = useFormState({ control });
  console.log({ formValues: getValues(), errors });
  return (
    <>
      <h2 className='text-3xl text-center font-semibold mb-6'>Add Property</h2>
      <FormSelect name='type' label='Property Type' options={propetyTypeOptions} />
      <FormInput name='name' label='Listing Name' placeholder='eg. Beautiful Apartment In Miami' />
      <FormInput name='description' label='Description' placeholder='Add an optional description of your property' />

      <div className='bg-blue-50 p-4 flex flex-col gap-4'>
        <Label>Location</Label>
        <FormInput name='location.street' placeholder='Street' />
        <FormInput name='location.city' placeholder='City' />
        <FormInput name='location.state' placeholder='State' />
        <FormInput name='location.zipcode' placeholder='Zipcode' />
      </div>

      <div className='flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
        <FormInput type='number' name='beds' label='Beds' />
        <FormInput type='number' name='baths' label='Baths' />
        <FormInput type='number' name='square_feet' label='Square Feet' />
      </div>

      <FormCheckboxGroup name='amenities' label='Amenities' items={amenitiesItems} />

      <div className='mb-4 bg-blue-50 p-4'>
        <label className='block text-gray-700 font-bold mb-2'>Rates (Leave blank if not applicable)</label>
        <div className='flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
          <FormInput type='number' name='rates.weekly' label='Weekly' />
          <FormInput type='number' name='rates.monthly' label='Monthly' />
          <FormInput type='number' name='rates.nightly' label='Nightly' />
        </div>
      </div>

      <FormInput name='seller_info.name' label='Seller Name' placeholder='Name' />
      <FormInput name='seller_info.email' label='Seller Email' placeholder='Email Address' />
      <FormInput type='tel' name='seller_info.phone' label='Seller Phone' placeholder='Phone' />
      <FormInput type='file' name='images' label='Images (Select up to 4 images)' accept='image/*' multiple />

      <div>
        <Button
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
          type='submit'
        >
          Add Property
        </Button>
      </div>
    </>
  );
}
