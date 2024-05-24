"use client";

import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Checkbox } from "../ui/checkbox";

export type IFormCheckbox = {
  item: {
    id: string;
    label: string;
  };
  name: string;
};

export function FormCheckbox({ item, name }: IFormCheckbox) {
  const { control, getValues } = useFormContext();

  return (
    <FormField
      key={item.id}
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem key={item.id} className='flex flex-row items-start space-x-3 space-y-0'>
            <FormControl>
              <Checkbox
                checked={field.value?.includes(item.id)}
                onCheckedChange={(checked) => {
                  return checked
                    ? field.onChange([...field.value, item.id])
                    : field.onChange(field.value?.filter((value: string) => value !== item.id));
                }}
              />
            </FormControl>
            <FormLabel className='text-sm font-normal'>{item.label}</FormLabel>
          </FormItem>
        );
      }}
    />
  );
}
