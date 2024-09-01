"use client";
import { propertyTypeOptions } from "@/lib/constants";
import { Button } from "./ui/button";
import { Form } from "./form/Form";
import { FormInput } from "./form/FormInput";
import { defaultPropertySearchFormValues } from "./form/utils";
import { PropertySearchSchema, TPropertySearchFormState } from "@/types/properties.types";
import { FormSelect } from "./form/FormSelect";
import { useRouter } from "next/navigation";

export default function PropertySearchForm() {
  const router = useRouter();

  const handleOnSubmit = ({ location, propertyType }: TPropertySearchFormState) => {
    if (location === "" && propertyType === "All") return router.push("/properties");

    const query = new URLSearchParams();

    query.append("location", location ?? "");
    query.append("propertyType", propertyType ?? "");
    router.push(`/properties/search-results?${query}`);
  };

  return (
    <Form
      schema={PropertySearchSchema}
      defaultValues={defaultPropertySearchFormValues}
      onSubmit={handleOnSubmit}
      className='mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center'
    >
      <PropertySearchFormContent />
    </Form>
  );
}

function PropertySearchFormContent() {
  return (
    <>
      <div className='w-full md:w-3/5 md:pr-2 mb-4 md:mb-0'>
        <FormInput
          name='location'
          placeholder='Enter Location (City, State, Zip, etc'
          className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500 h-auto'
        />
      </div>
      <div className='w-full md:w-2/5 md:pl-2'>
        <FormSelect
          name='propertyType'
          label='Property Type'
          options={[{ value: "All", label: "All" }, ...propertyTypeOptions]}
          showFormLabel={false}
          className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500 h-auto'
        />
      </div>
      <Button
        type='submit'
        className='md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 h-auto'
      >
        Search
      </Button>
    </>
  );
}
