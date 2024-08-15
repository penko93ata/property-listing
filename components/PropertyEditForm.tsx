"use client";
import { PropertyAddFormSchema, TProperty, TPropertyEditFormState } from "@/types/properties.types";
import { Form } from "./form/Form";
import { PropertyAddFormContent } from "./form/PropertyAddFormContent";
import { getPropertyEditFormDefaultValues } from "./form/utils";
import { updateProperty } from "@/app/actions/updateProperty";
import { useParams } from "next/navigation";

export default function PropertyEditForm({ property }: { property: TProperty }) {
  const { id } = useParams<{ id: string }>();
  const handleSubmit = async (data: TPropertyEditFormState) => {
    return await updateProperty(id, data);
  };
  return (
    <Form<TPropertyEditFormState>
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
