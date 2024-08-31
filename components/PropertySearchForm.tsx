"use client";
import { SelectItem } from "@radix-ui/react-select";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue } from "./ui/select";
import { propetyTypeOptions } from "@/lib/constants";
import { Button } from "./ui/button";

export default function PropertySearchForm() {
  return (
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
              {propetyTypeOptions.map((option) => (
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
  );
}
