import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import prisma from "@/lib/db";
import { TProperty } from "@/types/properties.types";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export default async function SearchResultsPage({
  searchParams: { location, propertyType },
}: {
  searchParams: { location: string; propertyType: string };
}) {
  const locationPattern = new RegExp(location, "i");

  if (Boolean(propertyType) && propertyType !== "All") {
    const typePattern = new RegExp(propertyType, "i");
  }

  const properties = await prisma.properties.findMany({
    where: {
      OR: [
        {
          name: {
            contains: location,
            mode: "insensitive",
          },
        },
        { description: { contains: location, mode: "insensitive" } },
        {
          location: {
            is: {
              OR: [
                { state: { contains: location, mode: "insensitive" } },
                { street: { contains: location, mode: "insensitive" } },
                { city: { contains: location, mode: "insensitive" } },
                { zipcode: { contains: location, mode: "insensitive" } },
              ],
            },
          },
        },
      ],
      type: {
        contains: propertyType !== "All" ? propertyType : "",
        mode: "insensitive",
      },
    },
  });

  return (
    <>
      <section className='bg-blue-700 py-4'>
        <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
          <PropertySearchForm />
        </div>
      </section>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <Link href='/properties' className='flex items-center text-blue-500 hover:underline mb-3'>
            <FaArrowAltCircleLeft className='mr-2 mb-1' /> Back to Properties
          </Link>
          <h1 className='text-2xl mb-4'>Search Results</h1>
          {properties.length === 0 ? (
            <p>No search results</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-col-3 gap-6'>
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property as TProperty} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
