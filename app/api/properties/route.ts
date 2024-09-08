import { NextRequest, NextResponse } from "next/server";
import { PropertiesGetSchema } from "@/types/properties.types";
import prisma from "@/lib/db";

// GET /api/properties
export async function GET(request: NextRequest) {
  const {
    nextUrl: { searchParams },
  } = request;

  const page = parseInt(searchParams.get("page") as string) || 1;
  const pageSize = parseInt(searchParams.get("pageSize") as string) || 3;
  const skip = (page - 1) * pageSize;

  try {
    const properties = await prisma.properties.findMany({ skip, take: pageSize });

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
