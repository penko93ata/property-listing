import { TMessage } from "@/types/messages.types";
import { TProperty } from "@/types/properties.types";
import { Button } from "./ui/button";

export default function MessageCard({ message, property }: { message: TMessage; property: TProperty }) {
  return (
    <div className='relative bg-white p-4 rounded-md shadow-md border-gray-200'>
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
      <Button className='mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md'>Mark As Read</Button>
      <Button className='mt-4 bg-red-500 hover:bg-red-900 text-white py-1 px-3 rounded-md'>Delete</Button>
    </div>
  );
}
