import { useRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import { FaTrashAlt } from "react-icons/fa";

export function UploadPropertyImages() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "images", keyName: "imageId" });

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const onAddImages = () => hiddenFileInput.current?.click();

  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedImages = Array.from(e.target.files ?? []);

    const images = uploadedImages.map((image) => image);

    append(images);

    hiddenFileInput.current!.value = "";
  };

  return (
    <>
      <input className='hidden' type='file' ref={hiddenFileInput} onChange={handleAddImages} multiple />

      <div className='w-60 m-2 grid gap-2'>
        <Button variant='outline' type='button' onClick={onAddImages}>
          Images (Select up to 4 images)
        </Button>
        {fields.map((field, index) => (
          <FormField
            key={field.imageId}
            control={control}
            name={`images.${index}`}
            render={({ field }) => (
              <div className='flex items-center justify-between gap-2'>
                <div>{field.name}</div>
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
