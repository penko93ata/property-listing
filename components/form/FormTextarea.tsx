"use client";
import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input, InputProps } from "../ui/input";
import { IFormContextInput } from "@/types/form.types";
import { Textarea, TextareaProps } from "../ui/textarea";

export function FormTextarea({
  name,
  id = name,
  label,
  defaultValue = "",
  modifyFieldProps,
  helperText,
  ...rest
}: IFormContextInput<TextareaProps>) {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {
        const modifiedFieldProps = modifyFieldProps?.(field);
        const inputProps = {
          ...field,
          ...modifiedFieldProps,
          ...rest,
        };
        return (
          <FormItem>
            {Boolean(label) && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Textarea placeholder={typeof label === "string" ? label : ""} {...inputProps} />
            </FormControl>
            {Boolean(helperText) && <FormDescription>{helperText}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
