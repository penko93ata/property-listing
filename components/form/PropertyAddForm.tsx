"use client";
import { PropertyAddFormSchema, TPropertyAddFormState } from "@/types/properties.types";
import { Button } from "../ui/button";
import { Form } from "./Form";
import { FormInput } from "./FormInput";

export default function PropertyAddForm() {
  const handleSubmit = (data: TPropertyAddFormState) => {
    console.log(data);
  };
  return (
    <Form<TPropertyAddFormState> schema={PropertyAddFormSchema} onSubmit={handleSubmit}>
      <h2 className='text-3xl text-center font-semibold mb-6'>Add Property</h2>

      <div className='mb-4'>
        <label htmlFor='type' className='block text-gray-700 font-bold mb-2'>
          Property Type
        </label>
        <select id='type' name='type' className='border rounded w-full py-2 px-3' required>
          <option value='Apartment'>Apartment</option>
          <option value='Condo'>Condo</option>
          <option value='House'>House</option>
          <option value='Cabin Or Cottage'>Cabin or Cottage</option>
          <option value='Room'>Room</option>
          <option value='Studio'>Studio</option>
          <option value='Other'>Other</option>
        </select>
      </div>
      <FormInput name='name' label='Listing Name' placeholder='eg. Beautiful Apartment In Miami' />
      <FormInput name='description' label='Description' placeholder='Add an optional description of your property' />

      <div className='mb-4 bg-blue-50 p-4'>
        <label className='block text-gray-700 font-bold mb-2'>Location</label>
        <input type='text' id='street' name='location.street' className='border rounded w-full py-2 px-3 mb-2' placeholder='Street' />
        <input type='text' id='city' name='location.city' className='border rounded w-full py-2 px-3 mb-2' placeholder='City' required />
        <input type='text' id='state' name='location.state' className='border rounded w-full py-2 px-3 mb-2' placeholder='State' required />
        <input type='text' id='zipcode' name='location.zipcode' className='border rounded w-full py-2 px-3 mb-2' placeholder='Zipcode' />
      </div>

      <div className='mb-4 flex flex-wrap'>
        {/* <div className='w-full sm:w-1/3 pr-2'>
          <label htmlFor='beds' className='block text-gray-700 font-bold mb-2'>
            Beds
          </label>
          <input type='number' id='beds' name='beds' className='border rounded w-full py-2 px-3' required />
        </div> */}
        <FormInput type='number' name='beds' label='Beds' />
        <FormInput type='number' name='baths' label='Baths' />
        <FormInput type='number' name='square_feet' label='Square Feet' />
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>Amenities</label>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
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
      </div>

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

      <div className='mb-4'>
        <label htmlFor='images' className='block text-gray-700 font-bold mb-2'>
          Images (Select up to 4 images)
        </label>
        <input type='file' id='images' name='images' className='border rounded w-full py-2 px-3' accept='image/*' multiple />
      </div>

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
