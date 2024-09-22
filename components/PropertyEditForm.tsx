"use client";
import { PropertyAddFormSchema, TProperty, TPropertyEditFormState } from "@/types/properties.types";
import { Form } from "./form/Form";
import { PropertyAddFormContent } from "./form/PropertyAddFormContent";
import { getPropertyEditFormDefaultValues } from "./form/utils";
import { updateProperty } from "@/app/actions/updateProperty";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function PropertyEditForm({ property }: { property: TProperty }) {
  const { id } = useParams<{ id: string }>();
  const [isPending, startTransition] = useTransition();
  const handleSubmit = (data: TPropertyEditFormState) => {
    startTransition(() => {
      toast.promise(updateProperty(id, data), {
        loading: "Updating property...",
        success: () => "Property updated successfully",
        error: (error) => error?.message || "An error occurred",
      });
    });
  };
  return (
    <Form<TPropertyEditFormState>
      schema={PropertyAddFormSchema}
      defaultValues={getPropertyEditFormDefaultValues(property)}
      onSubmit={handleSubmit}
      className='flex flex-col gap-4'
      encType='multipart/form-data'
    >
      <PropertyAddFormContent isPending={isPending} />
    </Form>
  );
}
