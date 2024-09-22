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
import { useToast } from "./ui/use-toast";

export default function PropertyContactForm({ property }: { property: TProperty }) {
  const { data: session } = useSession();
  const { toast } = useToast();

  const handleOnSubmit = async (data: TAddMessageFormState) => {
    const response = await addMessage({ data, property: property.id, recipient: property.owner });

    if (response.submitted) {
      return toast({
        variant: "success",
        title: "Message sent",
        description: "Your message has been sent",
      });
    }

    if (response.error) {
      return toast({
        description: response.error,
        variant: "destructive",
      });
    }
  };

  if (!session) return null;

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h3 className='text-xl font-bold mb-6'>Contact Property Manager</h3>
      <Form schema={AddMessageSchema} defaultValues={defaultMessageFormValues} onSubmit={handleOnSubmit} className='grid gap-4'>
        <PropertyContactFormContent />
      </Form>
      {/* <form>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
            Name:
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='name'
            type='text'
            placeholder='Enter your name'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
            Email:
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            type='email'
            placeholder='Enter your email'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='phone'>
            Phone:
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='phone'
            type='text'
            placeholder='Enter your phone number'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='message'>
            Message:
          </label>
          <textarea
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline'
            id='message'
            placeholder='Enter your message'
          ></textarea>
        </div>
        <div>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center'
            type='submit'
          >
            <FaPaperPlane className='mr-2' /> Send Message
          </button>
        </div>
      </form> */}
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
