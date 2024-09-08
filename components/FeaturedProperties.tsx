import prisma from "@/lib/db";
import { fetchProperties } from "@/utils/requests";
import FeaturedPropertyCard from "./FeaturedPropertyCard";
import { TProperty } from "@/types/properties.types";

export default async function FeaturedProperties() {
  const properties = await prisma.properties.findMany({
    where: {
      isFeatured: true,
    },
  });

  return properties.length > 0 ? (
    <section className='bg-blue-50 px-4 pt-6 pb-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>Featured Properties</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {properties.map((property) => (
            <FeaturedPropertyCard key={property.id} property={property as TProperty} />
          ))}
        </div>
      </div>
    </section>
  ) : null;
}
