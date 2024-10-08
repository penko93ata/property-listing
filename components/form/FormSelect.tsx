"use client";
import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { IFormContextSelect } from "@/types/form.types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SelectProps } from "@radix-ui/react-select";

export function FormSelect({
  name,
  id = name,
  label,
  modifyFieldProps,
  helperText,
  options,
  className,
  showFormLabel = true,
  ...rest
}: IFormContextSelect<SelectProps>) {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormItem>
            {showFormLabel && <FormLabel>{label}</FormLabel>}
            <Select onValueChange={field.onChange} defaultValue={field.value} {...rest}>
              <FormControl>
                <SelectTrigger className={className ?? "focus:ring focus:ring-blue-500"}>
                  <SelectValue placeholder={label} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {Boolean(helperText) && <FormDescription>{helperText}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
