import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import toast from "react-hot-toast";
import { PropertiesGetSchema } from "@/types/properties.types";

const prisma = new PrismaClient();

// GET /api/properties
export async function GET(request: NextApiRequest) {
  try {
    const properties = await prisma.properties.findMany();

    const result = await PropertiesGetSchema.safeParseAsync(properties);

    console.log({ result });

    if (!result.success) {
      return NextResponse.json({ message: result.error });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    toast.error("Something Went Wrong");
    return NextResponse.json({ message: "Something Went Wrong" });
  }
}
