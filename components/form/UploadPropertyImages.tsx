import { useRef } from "react";
import { useFieldArray, useFormContext, useFormState } from "react-hook-form";
import { FormField } from "../ui/form";
import { Button } from "../ui/button";
import { FaTrashAlt } from "react-icons/fa";
import { TPropertyAddFormState } from "@/types/properties.types";
import { ErrorMessage } from "@hookform/error-message";

export function UploadPropertyImages() {
  const { control, getValues } = useFormContext<TPropertyAddFormState>();
  const { errors } = useFormState<TPropertyAddFormState>({ control });
  const { fields, append, remove } = useFieldArray({ control, name: "images", keyName: "imageId" });

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const onAddImages = () => hiddenFileInput.current?.click();

  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedImages = Array.from(e.target.files ?? []);

    const images = uploadedImages.map((image) => image);

    append(images);

    hiddenFileInput.current!.value = "";
  };

  const images: File[] = getValues("images");

  return (
    <>
      <input className='hidden' type='file' ref={hiddenFileInput} onChange={handleAddImages} multiple />

      <div className='w-60 m-2 grid gap-2'>
        <Button variant='outline' type='button' onClick={onAddImages}>
          Images (Select up to 4 images)
        </Button>
        <ErrorMessage
          errors={errors}
          name='images'
          render={({ message }) => <p className='text-[0.8rem] font-medium text-destructive'>{message}</p>}
        />
        {fields.map((field, index) => (
          <FormField
            key={field.imageId}
            control={control}
            name={`images.${index}`}
            render={() => (
              <div className='flex items-center justify-between gap-2'>
                <div>{images[index].name}</div>
                <Button variant='outline' size='icon' onClick={() => remove(index)}>
                  <FaTrashAlt />
                </Button>
              </div>
            )}
          />
        ))}
      </div>
    </>
  );
}
