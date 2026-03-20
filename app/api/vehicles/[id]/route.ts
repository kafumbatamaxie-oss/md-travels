import { prisma } from "@/lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // params is a Promise
) {
  const { id } = await params // unwrap the Promise

  if (!id) {
    return new Response(
      JSON.stringify({ error: "Missing vehicle ID" }),
      { status: 400 }
    )
  }

  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: { images: true },
    })

    if (!vehicle) {
      return new Response(
        JSON.stringify({ error: "Vehicle not found" }),
        { status: 404 }
      )
    }

    return new Response(JSON.stringify(vehicle), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("GET /api/vehicles/[id] error:", err)
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    )
  }
}