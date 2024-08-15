"use client";

import { useFormContext, useFormState } from "react-hook-form";
import { FormSelect } from "./FormSelect";
import { FormInput } from "./FormInput";
import { amenitiesItems, propetyTypeOptions } from "@/lib/constants";
import { Label } from "../ui/label";
import { FormCheckboxGroup } from "./FormCheckboxGroup";
import { Button } from "../ui/button";
import { UploadPropertyImages } from "./UploadPropertyImages";
import { useParams } from "next/navigation";

export function PropertyAddFormContent() {
  const { control } = useFormContext();
  const { isSubmitting } = useFormState({ control });
  const { id } = useParams<{ id: string }>();

  const isEditPage = Boolean(id);

  return (
    <>
      <h2 className='text-3xl text-center font-semibold mb-6'>{isEditPage ? "Edit" : "Add"} Property</h2>
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

      {!isEditPage && <UploadPropertyImages />}

      <Button
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
        type='submit'
        disabled={isSubmitting}
      >
        {isEditPage ? "Edit" : "Add"} Property
      </Button>
    </>
  );
}
