import { useRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import { FaTrashAlt } from "react-icons/fa";

export function PropertyImages() {
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

      <div className='w-80 m-2'>
        {fields.map((field, index) => (
          <div key={field.imageId}>
            <FormField
              control={control}
              name={`images.${index}`}
              render={({ field }) => (
                <div className='flex items-center'>
                  <div>{field.name}</div>
                  <Button variant='outline' size='icon' onClick={() => remove(index)}>
                    <FaTrashAlt />
                  </Button>
                </div>
              )}
            />
          </div>
        ))}

        <Button variant='outline' onClick={onAddImages}>
          Add images
        </Button>
      </div>
    </>
  );
}
