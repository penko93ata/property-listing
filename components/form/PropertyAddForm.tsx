"use client";
import { PropertyAddFormSchema, TPropertyAddFormState } from "@/types/properties.types";
import { Form } from "./Form";
import { propertyAddFormDefaultValues } from "./utils";
import { onAddPropertySubmit } from "@/app/actions/addProperty";
import { PropertyAddFormContent } from "./PropertyAddFormContent";
import { omit } from "lodash";
import { toast } from "sonner";
import { useTransition } from "react";

export default function PropertyAddForm() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (data: TPropertyAddFormState) => {
    const formData = new FormData();
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }

    startTransition(() => {
      toast.promise(onAddPropertySubmit(omit(data, "images"), formData), {
        loading: "Adding property...",
        success: () => "Property added successfully",
        error: (error) => error?.message || "An error occurred",
      });
    });
  };

  return (
    <Form<TPropertyAddFormState>
      schema={PropertyAddFormSchema}
      defaultValues={propertyAddFormDefaultValues}
      onSubmit={handleSubmit}
      className='flex flex-col gap-4'
      encType='multipart/form-data'
    >
      <PropertyAddFormContent isPending={isPending} />
    </Form>
  );
}
