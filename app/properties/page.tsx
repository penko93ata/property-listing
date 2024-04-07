import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/types/properties.types";
import { fetchProperties } from "@/utils/requests";
// import { Prisma } from "@prisma/client";
// import type { properties } from "@prisma/client";

export default async function Properties() {
  // TODO - figure out correct type
  const properties: Property[] = await fetchProperties();

  // Sort properties by date
  const sortedProperties = properties.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {sortedProperties.map((property) => (
              <PropertyCard key={property._id} property={property as Property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
