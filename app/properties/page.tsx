import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/types/properties.types";
// import { Prisma } from "@prisma/client";
import type { properties } from "@prisma/client";

async function fetchProperties() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export default async function Properties() {
  // TODO - figure out correct type
  const properties: Property[] = await fetchProperties();

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property as Property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
