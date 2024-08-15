"use client";
import { PropertyAddFormSchema, TProperty, TPropertyAddFormState } from "@/types/properties.types";
import { Form } from "./form/Form";
import { PropertyAddFormContent } from "./form/PropertyAddFormContent";
import { getPropertyEditFormDefaultValues } from "./form/utils";

export default function PropertyEditForm({ property }: { property: TProperty }) {
  const handleSubmit = async (data: TPropertyAddFormState) => {};
  return (
    <Form<TPropertyAddFormState>
      schema={PropertyAddFormSchema}
      defaultValues={getPropertyEditFormDefaultValues(property)}
      onSubmit={handleSubmit}
      className='flex flex-col gap-4'
      encType='multipart/form-data'
    >
      <PropertyAddFormContent />
    </Form>
  );
}
