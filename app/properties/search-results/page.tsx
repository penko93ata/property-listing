import prisma from "@/lib/db";

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
        // TODO - need to figure out how to access location fields in prisma query
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
      //   location: {
      //     is: {
      //       street: { contains: location, mode: "insensitive" },
      //       city: { contains: location, mode: "insensitive" },
      //       state: { contains: location, mode: "insensitive" },
      //       zipcode: { contains: location, mode: "insensitive" },
      //       //   OR: [
      //       //     { state: { contains: location, mode: "insensitive" } },
      //       //     { street: { contains: location, mode: "insensitive" } },
      //       //     { city: { contains: location, mode: "insensitive" } },
      //       //     { zipcode: { contains: location, mode: "insensitive" } },
      //       //   ],
      //     },
      //   },
    },
  });

  console.log({ properties: properties.length });

  return <div>page</div>;
}
