import { IFormContextInput } from "@/types/form.types";
import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

export function withFormContext<ComponentPropTypes>(Component: React.ElementType): React.FC<IFormContextInput<ComponentPropTypes>> {
  return function WithFormContext({
    name,
    id = name,
    label,
    defaultValue = "",
    // modifyFieldProps,
    controllerRenderProps,
    isClearable,
    clearValue = "",
    helperText,
    ...rest
  }: IFormContextInput<ComponentPropTypes>) {
    const { control } = useFormContext();
    return (
      <FormField
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => {
          //   const modifiedFieldProps = modifyFieldProps?.(field);
          const getClearFieldMethod = () => {
            if (!isClearable) return {};
            if (!field.value) return {};
            if (Array.isArray(field.value) && field.value.length === 0) return {};
            return { onClear: () => field.onChange(clearValue) };
          };
          const inputProps = { ...field, id, label, ...fieldState, ...getClearFieldMethod(), ...controllerRenderProps, ...rest };
          return (
            // TODO - may need to refactor for checkboxes and radio buttons?
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Component {...inputProps} />
              </FormControl>
              {Boolean(helperText) && <FormDescription>{helperText}</FormDescription>}
              <FormMessage />
            </FormItem>
          );
        }}
      />
    );
  };
}
