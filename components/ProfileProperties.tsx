"use client";
import { deleteProperty } from "@/app/actions/deleteProperty";
import { TProperty } from "@/types/properties.types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function ProfileProperties({ properties: initialProperties }: { properties: TProperty[] }) {
  const [properties, setProperties] = useState(initialProperties);

  const handleDeleteProperty = async (propertyId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this property?");
    if (!confirmed) return;

    toast.promise(deleteProperty(propertyId), {
      loading: "Deleting property...",
      success: () => {
        const updatedProperties = properties.filter((property) => property.id !== propertyId);
        setProperties(updatedProperties);
        return "Property deleted successfully";
      },
      error: (error) => error?.message || "An error occurred",
    });
  };
  return properties.map((property) => (
    <div key={property.id} className='mb-10'>
      <Link href={`/properties/${property.id}`}>
        <Image className='h-32 w-full rounded-md object-cover' src={property.images[0]} alt='' width={1000} height={200} />
      </Link>
      <div className='mt-2'>
        <p className='text-lg font-semibold'>{property.name}</p>
        <p className='text-gray-600'>
          Address: {property.location.street} {property.location.city} {property.location.state}
        </p>
      </div>
      <div className='mt-2'>
        <Link href={`/properties/${property.id}/edit`} className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'>
          Edit
        </Link>
        <button
          className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
          type='button'
          onClick={() => handleDeleteProperty(property.id)}
        >
          Delete
        </button>
      </div>
    </div>
  ));
}
