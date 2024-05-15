"use client";
import { PropertyAddFormSchema, TPropertyAddFormState } from "@/types/properties.types";
import { Button } from "../ui/button";
import { Form } from "./Form";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";
import { Label } from "../ui/label";
import { FormCheckboxGroup } from "./FormCheckboxGroup";

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
  const handleSubmit = (data: TPropertyAddFormState) => {
    console.log(data);
  };
  return (
    <Form<TPropertyAddFormState> schema={PropertyAddFormSchema} onSubmit={handleSubmit} className='flex flex-col gap-4'>
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

      {/* <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>Amenities</label>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
          <div>
            <input type='checkbox' id='amenity_wifi' name='amenities' value='Wifi' className='mr-2' />
            <label htmlFor='amenity_wifi'>Wifi</label>
          </div>
          <div>
            <input type='checkbox' id='amenity_kitchen' name='amenities' value='Full Kitchen' className='mr-2' />
            <label htmlFor='amenity_kitchen'>Full kitchen</label>
          </div>
          <div>
            <input type='checkbox' id='amenity_washer_dryer' name='amenities' value='Washer & Dryer' className='mr-2' />
            <label htmlFor='amenity_washer_dryer'>Washer & Dryer</label>
          </div>
          <div>
            <input type='checkbox' id='amenity_free_parking' name='amenities' value='Free Parking' className='mr-2' />
            <label htmlFor='amenity_free_parking'>Free Parking</label>
          </div>
          <div>
            <input type='checkbox' id='amenity_pool' name='amenities' value='Swimming Pool' className='mr-2' />
            <label htmlFor='amenity_pool'>Swimming Pool</label>
          </div>
          <div>
            <input type='checkbox' id='amenity_hot_tub' name='amenities' value='Hot Tub' className='mr-2' />
            <label htmlFor='amenity_hot_tub'>Hot Tub</label>
          </div>
          <div>
            <input type='checkbox' id='amenity_24_7_security' name='amenities' value='24/7 Security' className='mr-2' />
            <label htmlFor='amenity_24_7_security'>24/7 Security</label>
          </div>
          <div>
            <input type='checkbox' id='amenity_wheelchair_accessible' name='amenities' value='Wheelchair Accessible' className='mr-2' />
            <label htmlFor='amenity_wheelchair_accessible'>Wheelchair Accessible</label>
          </div>
          <div>
            <input type='checkbox' id='amenity_elevator_access' name='amenities' value='Elevator Access' className='mr-2' />
            <label htmlFor='amenity_elevator_access'>Elevator Access</label>
          </div>
          <div>
            <input type='checkbox' id='amenity_dishwasher' name='amenities' value='Dishwasher' className='mr-2' />
            <label htmlFor='amenity_dishwasher'>Dishwasher</label>
          </div>
          <div>
            <input type='checkbox' id='amenity_gym_fitness_center' name='amenities' value='Gym/Fitness Center' className='mr-2' />
            <label htmlFor='amenity_gym_fitness_center'>Gym/Fitness Center</label>
          </div>
          <div>
            <input type='checkbox' id='amenity_air_conditioning' name='amenities' value='Air Conditioning' className='mr-2' />
            <label htmlFor='amenity_air_conditioning'>Air Conditioning</label>
          </div>
          <div>
            <input type='checkbox' id='amenity_balcony_patio' name='amenities' value='Balcony/Patio' className='mr-2' />
            <label htmlFor='amenity_balcony_patio'>Balcony/Patio</label>
          </div>
          <div>
            <input type='checkbox' id='amenity_smart_tv' name='amenities' value='Smart TV' className='mr-2' />
            <label htmlFor='amenity_smart_tv'>Smart TV</label>
          </div>
          <div>
            <input type='checkbox' id='amenity_coffee_maker' name='amenities' value='Coffee Maker' className='mr-2' />
            <label htmlFor='amenity_coffee_maker'>Coffee Maker</label>
          </div>
        </div>
      </div> */}
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
    </Form>
  );
}
