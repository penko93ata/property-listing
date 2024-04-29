import { IFormContextInput } from "@/types/form.types";
import { Controller, useFormContext } from "react-hook-form";

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
    ...rest
  }: IFormContextInput<ComponentPropTypes>) {
    const { control } = useFormContext();
    return (
      <Controller
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
          const inputProps = { ...field, id, label, ...fieldState, ...getClearFieldMethod(), ...rest, ...controllerRenderProps };
          return <Component {...inputProps} />;
        }}
      />
    );
  };
}
