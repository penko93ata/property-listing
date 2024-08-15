import PropertyEditForm from "@/components/PropertyEditForm";
import { TProperty } from "@/types/properties.types";
import { fetchProperty } from "@/utils/requests";

export default async function PropertyEditPage({ params: { id } }: { params: { id: string } }) {
  const property: TProperty = await fetchProperty(id);

  if (!property) {
    return <h1 className='text-center text-2xl font-bold mt-10'>Property Not Found</h1>;
  }

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
}
