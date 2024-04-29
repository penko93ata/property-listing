import React from "react";
import { FieldValues, useForm, UseFormReturn, DefaultValues, Resolver, FormProvider } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface FormProps<T extends FieldValues> {
  // TODO: Fix types ( as this problem occurs only on the posting FE, could be from mismatching versions of yup )
  //   schema: ObjectSchema<unknown, SchemaType, unknown, ""> | any;
  schema: z.ZodType<T>;
  onSubmit: (
    data: FieldValues,
    event: React.BaseSyntheticEvent<object, unknown, unknown>,
    formMethods: UseFormReturn<FieldValues, unknown, undefined>
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
    methods.handleSubmit((data, event) =>
      onSubmit?.(
        data,
        event as React.BaseSyntheticEvent<object, unknown, unknown>,
        methods as UseFormReturn<FieldValues, unknown, undefined>
      )
    )(e);
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
