import Pagination from "@/components/Pagination";
import PropertyCard from "@/components/PropertyCard";
import prisma from "@/lib/db";
import { TProperty } from "@/types/properties.types";
import { fetchProperties } from "@/utils/requests";
import Template from "../template";

export default async function PropertiesPage({
  searchParams: { page = 1, pageSize = 9 },
}: {
  searchParams: { page: number; pageSize: number };
}) {
  const total = await prisma.properties.count();

  const properties: TProperty[] = await fetchProperties({ searchParams: { page, pageSize } });

  // Sort properties by date
  const sortedProperties = properties.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <Template>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          {properties.length === 0 ? (
            <h2 className='text-2xl text-center font-semibold'>No Properties Found</h2>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {sortedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
          <Pagination page={page} pageSize={pageSize} totalItems={total} />
        </div>
      </section>
    </Template>
  );
}
