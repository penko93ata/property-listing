"use client";

import { useFormContext } from "react-hook-form";
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { IFormContextCheckboxGroup } from "@/types/form.types";
import { CheckboxProps } from "@radix-ui/react-checkbox";
import { FormCheckbox } from "./FormCheckbox";

export function FormCheckboxGroup({ name, label, helperText, items }: IFormContextCheckboxGroup<CheckboxProps>) {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      defaultValue={[]}
      render={() => {
        return (
          <FormItem>
            <div className='mb-4'>
              <FormLabel className='text-base'>{label}</FormLabel>
              {Boolean(helperText) && <FormDescription>Select the items you want to display in the sidebar.</FormDescription>}
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
              {items.map((item) => (
                <FormCheckbox key={item.id} item={item} name={name} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
