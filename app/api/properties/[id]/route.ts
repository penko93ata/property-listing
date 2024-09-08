import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { PropertyGetSchema } from "@/types/properties.types";

// GET /api/properties/[id]
export async function GET(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const property = await prisma.properties.findUnique({
      where: {
        id,
      },
    });

    if (!property) {
      return NextResponse.json({ message: "Property Not Found" }, { status: 404 });
    }

    const result = await PropertyGetSchema.safeParseAsync(property);

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
