import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/properties
export async function GET(request: NextApiRequest) {
  try {
    const properties = await prisma.properties.findMany();

    return NextResponse.json(properties);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something Went Wrong" });
  }
}
