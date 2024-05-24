import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { PropertiesGetSchema, PropertyAddFormSchema } from "@/types/properties.types";
import prisma from "@/lib/db";

// GET /api/properties
export async function GET(request: NextApiRequest) {
  try {
    const properties = await prisma.properties.findMany();

    const result = await PropertiesGetSchema.safeParseAsync(properties);

    if (!result.success) {
      return NextResponse.json({ message: result.error });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    }

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// export async function POST(request: NextApiRequest, response: NextApiResponse) {
//   const formData = Object.fromEntries(request.body);
//   const parsedData = PropertyAddFormSchema.safeParse(formData);

//   if (!parsedData.success) {
//     // TODO - error handling
//   }

//   return response.status(204);
// }
