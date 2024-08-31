import { getSessionUser } from "@/app/actions/getSessionUser";
import PropertyCard from "@/components/PropertyCard";
import prisma from "@/lib/db";
import { TProperty } from "@/types/properties.types";

export default async function SavePropertiesPage() {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return <h1 className='text-center text-2xl font-bold mt-10'>You must be logged in to view saved properties</h1>;
  }

  const user = await prisma.users.findUnique({ where: { id: sessionUser.userId }, select: { bookmarks: true } });
  const bookmarkedProperties = await prisma.properties.findMany({ where: { id: { in: user?.bookmarks ?? [] } } });

  return (
    <section className='px-4 py-6'>
      <div className='container lg:container m-auto px-4 py-6'>
        <h1 className='text-2xl mb-4'>Saved Properties</h1>
        {bookmarkedProperties.length === 0 ? (
          <p>You have not saved any properties yet</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {bookmarkedProperties.map((property) => (
              <PropertyCard key={property.id} property={property as TProperty} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
