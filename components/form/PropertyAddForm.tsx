"use client";
import { PropertyAddFormSchema, TPropertyAddFormState } from "@/types/properties.types";
import { Form } from "./Form";
import { propertyAddFormDefaultValues } from "./utils";
import { onAddPropertySubmit } from "@/app/actions/addProperty";
import { PropertyAddFormContent } from "./PropertyAddFormContent";
import { omit } from "lodash";

export default function PropertyAddForm() {
  const handleSubmit = async (data: TPropertyAddFormState) => {
    const formData = new FormData();
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }

    return await onAddPropertySubmit(omit(data, "images"), formData);
  };

  return (
    <Form<TPropertyAddFormState>
      schema={PropertyAddFormSchema}
      defaultValues={propertyAddFormDefaultValues}
      onSubmit={handleSubmit}
      className='flex flex-col gap-4'
      encType='multipart/form-data'
    >
      <PropertyAddFormContent />
    </Form>
  );
}
