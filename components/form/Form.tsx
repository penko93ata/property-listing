"use client";
import { FieldValues, useForm, UseFormReturn, DefaultValues } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form as UIForm } from "../ui/form";

interface FormProps<T extends FieldValues> extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  schema: z.ZodType<T>;
  onSubmit: (
    data: T,
    event: React.BaseSyntheticEvent<object, unknown, unknown> | undefined,
    formMethods: UseFormReturn<T, unknown, undefined>
  ) => void;
  defaultValues?: DefaultValues<T>;
  children: React.ReactNode;
  withDebug?: boolean;
  // onSubmitAction: (prevState: FormStateResponse, formData: FormData) => Promise<FormStateResponse>;
}
export function Form<T extends FieldValues>({
  schema,
  // onSubmit,
  defaultValues,
  children,
  withDebug = false,
  onSubmit,
  ...rest
}: FormProps<T>) {
  // const [state, formAction] = useFormState(onSubmitAction, { message: "" });
  const form = useForm<T>({ resolver: zodResolver(schema), defaultValues });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Stop propagation is required to allow nested forms to be submitted without submitting the parent form
    // e.stopPropagation();
    // Handle submit returns a function that expects the event as a parameter
    // Included form methods for custom multi submit actions
    // form.handleSubmit((data, event) => onSubmit?.(data, event, form))(e);
    e.preventDefault();
    form.handleSubmit((data, event) => onSubmit?.(data, event, form))(e);
  };

  return (
    <>
      <UIForm {...form}>
        <form {...rest} onSubmit={handleFormSubmit}>
          {children}
        </form>
      </UIForm>
      {withDebug && <DevTool control={form.control} />}
    </>
  );
}
