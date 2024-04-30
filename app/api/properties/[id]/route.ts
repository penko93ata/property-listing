import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET /api/properties/[id]
export async function GET(request: NextApiRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const property = await prisma.properties.findUnique({
      where: {
        id,
      },
    });

    if (!property) {
      return NextResponse.json({ message: "Property Not Found" }, { status: 404 });
    }

    return NextResponse.json(property);
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    }

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
