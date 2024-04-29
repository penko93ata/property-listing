import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import toast from "react-hot-toast";

const prisma = new PrismaClient();

// GET /api/properties
export async function GET(request: NextApiRequest) {
  try {
    const properties = await prisma.properties.findMany();

    return NextResponse.json(properties);
  } catch (error) {
    toast.error("Something Went Wrong");
    return NextResponse.json({ message: "Something Went Wrong" });
  }
}
