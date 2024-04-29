import React from "react";
import { FieldValues, useForm, UseFormReturn, DefaultValues, Resolver, FormProvider } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface FormProps<T extends FieldValues> {
  schema: z.ZodType<T>;
  onSubmit: (
    data: T,
    event: React.BaseSyntheticEvent<object, unknown, unknown> | undefined,
    formMethods: UseFormReturn<T, unknown, undefined>
  ) => void;
  //   onSubmit: SubmitHandler<T>;
  defaultValues?: DefaultValues<T>;
  children: React.ReactNode;
  id?: string;
  className?: string;
  withDebug?: boolean;
}
export function Form<T extends FieldValues>({ schema, onSubmit, defaultValues, children, id, className, withDebug = false }: FormProps<T>) {
  const methods = useForm<T>({ defaultValues, resolver: zodResolver(schema) as Resolver<T> });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Stop propagation is required to allow nested forms to be submitted without submitting the parent form
    e.stopPropagation();
    // Handle submit returns a function that expects the event as a parameter
    // Included form methods for custom multi submit actions
    methods.handleSubmit((data, event) => onSubmit?.(data, event, methods))(e);
  };
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleFormSubmit} id={id} className={className}>
          {children}
        </form>
      </FormProvider>
      {withDebug && <DevTool control={methods.control} />}
    </>
  );
}
