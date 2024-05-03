"use client";
import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input, InputProps } from "../ui/input";
import { IFormContextInput } from "@/types/form.types";

export function FormInput({
  name,
  id = name,
  label,
  defaultValue = "",
  modifyFieldProps,
  isClearable,
  clearValue = "",
  helperText,
  ...rest
}: IFormContextInput<InputProps>) {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {
        const modifiedFieldProps = modifyFieldProps?.(field);
        // const getClearFieldMethod = () => {
        //   if (!isClearable) return {};
        //   if (!field.value) return {};
        //   if (Array.isArray(field.value) && field.value.length === 0) return {};
        //   return { onClear: () => field.onChange(clearValue) };
        // };
        const inputProps = {
          ...field,
          //   ...getClearFieldMethod(),
          ...modifiedFieldProps,
          // ...controllerRenderProps,
          ...rest,
        };
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input placeholder={typeof label === "string" ? label : ""} {...inputProps} />
            </FormControl>
            {Boolean(helperText) && <FormDescription>{helperText}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
