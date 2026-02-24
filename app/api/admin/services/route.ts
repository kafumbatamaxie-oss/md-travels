import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const data = await req.json()

  const service = await prisma.service.create({
    data,
  })

  return NextResponse.json(service)
}