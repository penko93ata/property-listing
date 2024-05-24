"use client";
import { FieldValues, useForm, UseFormReturn, DefaultValues } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form as UIForm } from "../ui/form";
import { useFormState } from "react-dom";
import { FormStateResponse } from "@/types/form.types";
import { useRef } from "react";

interface FormProps<T extends FieldValues> {
  schema: z.ZodType<T>;
  onSubmit: (
    data: T,
    event: React.BaseSyntheticEvent<object, unknown, unknown> | undefined,
    formMethods: UseFormReturn<T, unknown, undefined>
  ) => void;
  defaultValues?: DefaultValues<T>;
  children: React.ReactNode;
  id?: string;
  className?: string;
  withDebug?: boolean;
  onSubmitAction: (prevState: FormStateResponse, formData: FormData) => Promise<FormStateResponse>;
}
export function Form<T extends FieldValues>({
  schema,
  onSubmit,
  defaultValues,
  children,
  id,
  className,
  withDebug = false,
  onSubmitAction,
}: FormProps<T>) {
  const form = useForm<T>({ defaultValues, resolver: zodResolver(schema) });
  const [state, formAction] = useFormState(onSubmitAction, { message: "" });

  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Stop propagation is required to allow nested forms to be submitted without submitting the parent form
    e.stopPropagation();
    // Handle submit returns a function that expects the event as a parameter
    // Included form methods for custom multi submit actions
    // form.handleSubmit((data, event) => onSubmit?.(data, event, form))(e);
    e.preventDefault();
    form.handleSubmit(() => {
      formAction(new FormData(formRef.current!));
    });
  };

  return (
    <>
      <UIForm {...form}>
        <form action={formAction} ref={formRef} onSubmit={handleFormSubmit} id={id} className={className}>
          {children}
        </form>
      </UIForm>
      {withDebug && <DevTool control={form.control} />}
    </>
  );
}
