"use client";
import { TMessage } from "@/types/messages.types";
import { TProperty } from "@/types/properties.types";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { markMessageAsRead } from "@/app/actions/markMessageAsRead";
import { deleteMessage } from "@/app/actions/deleteMessage";
import { useTransition } from "react";

export default function MessageCard({ message, property }: { message: TMessage; property: TProperty }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleReadClick = async () => {
    const read = await markMessageAsRead(message.id);
    toast({
      title: read ? "Message marked as read" : "Message marked as unread",
      description: `The message from ${message.name} has been marked as ${read ? "read" : "unread"}`,
    });
  };

  const handleDeleteClick = async () => {
    startTransition(async () => await deleteMessage(message.id));
    toast({
      title: "Message deleted",
      description: `The message from ${message.name} has been deleted`,
    });
  };

  if (isPending) return <p>Deleting Message</p>;

  return (
    <div className='relative bg-white p-4 rounded-md shadow-md border-gray-200'>
      {!message.read && <div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md'>New</div>}
      <h2 className='text-xl mb-4'>
        <span className='font-bold'>Property Inquiry:</span> {property.name}
      </h2>
      <p className='text-gray-700'>{message.body}</p>

      <ul className='mt-4'>
        <li>
          <strong>Reply Email:</strong>{" "}
          <a href={`mailto:${message.email}`} className='text-blue-500'>
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{" "}
          <a href={`tel:${message.phone}`} className='text-blue-500'>
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong> {message.createdAt.toLocaleString()}
        </li>
      </ul>
      <Button onClick={handleReadClick} className='mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md'>
        {message.read ? "Mark As New" : "Mark As Read"}
      </Button>
      <Button onClick={handleDeleteClick} className='mt-4 bg-red-500 hover:bg-red-900 text-white py-1 px-3 rounded-md'>
        Delete
      </Button>
    </div>
  );
}
