"use client";
import { TProperty } from "@/types/properties.types";
import { FaPaperPlane } from "react-icons/fa";
import { Form } from "./form/Form";
import { AddMessageSchema, TAddMessageFormState } from "@/types/messages.types";
import { defaultMessageFormValues } from "./form/utils";
import { FormInput } from "./form/FormInput";
import { Button } from "./ui/button";
import { FormTextarea } from "./form/FormTextarea";
import { addMessage } from "@/app/actions/addMessage";
import { useSession } from "next-auth/react";
import { useFormContext, useFormState } from "react-hook-form";
import { toast } from "sonner";

export default function PropertyContactForm({ property }: { property: TProperty }) {
  const { data: session } = useSession();

  const handleOnSubmit = (data: TAddMessageFormState) => {
    const addMessagePromise = addMessage({ data, property: property.id, recipient: property.owner });

    toast.promise(addMessagePromise, {
      loading: "Sending message...",
      success: (data) => {
        if (data.submitted) {
          return "Your message has been sent";
        }
        if (data.error) {
          return data.error;
        }
      },
    });
  };

  if (!session) return null;

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h3 className='text-xl font-bold mb-6'>Contact Property Manager</h3>
      <Form schema={AddMessageSchema} defaultValues={defaultMessageFormValues} onSubmit={handleOnSubmit} className='grid gap-4'>
        <PropertyContactFormContent />
      </Form>
    </div>
  );
}

function PropertyContactFormContent() {
  const { control } = useFormContext();
  const { isSubmitting } = useFormState({ control });

  return (
    <>
      <FormInput name='name' label='Name' placeholder='Enter your name' />
      <FormInput name='email' label='Email' placeholder='Enter your email' />
      <FormInput name='phone' label='Phone' placeholder='Enter your phone number' />
      <FormTextarea name='body' label='Message' placeholder='Enter your message' />
      <Button
        type='submit'
        disabled={isSubmitting}
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center'
      >
        <FaPaperPlane className='mr-2' /> Send Message
      </Button>
    </>
  );
}
