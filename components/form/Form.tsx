"use client";
import { FieldValues, useForm, UseFormReturn, DefaultValues } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form as UIForm } from "../ui/form";
import { useFormState } from "react-dom";
import { FormStateResponse } from "@/types/form.types";
import { useRef } from "react";

interface FormProps<T extends FieldValues> extends React.FormHTMLAttributes<HTMLFormElement> {
  schema: z.ZodType<T>;
  // onSubmit: (
  //   data: T,
  //   event: React.BaseSyntheticEvent<object, unknown, unknown> | undefined,
  //   formMethods: UseFormReturn<T, unknown, undefined>
  // ) => void;
  defaultValues?: DefaultValues<T>;
  children: React.ReactNode;
  withDebug?: boolean;
  onSubmitAction: (prevState: FormStateResponse, formData: FormData) => Promise<FormStateResponse>;
}
export function Form<T extends FieldValues>({
  schema,
  // onSubmit,
  defaultValues,
  children,
  withDebug = false,
  onSubmitAction,
  ...rest
}: FormProps<T>) {
  const [state, formAction] = useFormState(onSubmitAction, { message: "" });
  const form = useForm<T>({ resolver: zodResolver(schema), defaultValues: (state?.fields as DefaultValues<T>) ?? defaultValues });

  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Stop propagation is required to allow nested forms to be submitted without submitting the parent form
    // e.stopPropagation();
    // Handle submit returns a function that expects the event as a parameter
    // Included form methods for custom multi submit actions
    // form.handleSubmit((data, event) => onSubmit?.(data, event, form))(e);
    e.preventDefault();
    form.handleSubmit(() => formRef.current?.submit());
  };

  return (
    <>
      <UIForm {...form}>
        {state?.message !== "" && !state.issues && <div className='text-red-500'>{state.message}</div>}
        {state?.issues && (
          <div className='text-red-500'>
            <ul>
              {state.issues.map((issue) => (
                <li key={issue} className='flex gap-1'>
                  {/* <X fill='red' /> */}
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        )}
        <form {...rest} ref={formRef} action={formAction} onSubmit={handleFormSubmit}>
          {children}
        </form>
      </UIForm>
      {withDebug && <DevTool control={form.control} />}
    </>
  );
}
