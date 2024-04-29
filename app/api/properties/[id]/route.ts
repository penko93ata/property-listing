import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import toast from "react-hot-toast";

const prisma = new PrismaClient();

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
    toast.error("Something Went Wrong");
    return NextResponse.json({ message: "Something Went Wrong" });
  }
}
