import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const selectOptions = [
  { value: "All", label: "All" },
  { value: "Apartment", label: "Apartment" },
  { value: "Studio", label: "Studio" },
  { value: "Condo", label: "Condo" },
  { value: "House", label: "House" },
  { value: "Cabin Or Cottage", label: "Cabin Or Cottage" },
  { value: "Loft", label: "Loft" },
  { value: "Room", label: "Room" },
  { value: "Other", label: "Other" },
];

export function Hero() {
  return (
    <section className='bg-blue-700 py-20 mb-4'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold text-white sm:text-5xl md:text-6xl'>Find The Perfect Rental</h1>
          <p className='my-4 text-xl text-white'>Discover the perfect property that suits your needs.</p>
        </div>
        <form className='mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center'>
          <div className='w-full md:w-3/5 md:pr-2 mb-4 md:mb-0'>
            <Input
              placeholder='Enter Location (City, State, Zip, etc'
              className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500 h-auto'
            />
          </div>
          <div className='w-full md:w-2/5 md:pl-2'>
            <Select>
              <SelectTrigger className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500 h-auto'>
                <SelectValue placeholder='Property Type' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {selectOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button
            type='submit'
            className='md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 h-auto'
          >
            Search
          </Button>
        </form>
      </div>
    </section>
  );
}
