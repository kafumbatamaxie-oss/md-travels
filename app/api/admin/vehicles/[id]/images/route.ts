import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import cloudinary from "@/lib/cloudinary"



export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await context.params
    const body = await req.json()

    const { url, publicId } = body

    const image = await prisma.vehicleImage.create({
      data: {
        vehicleId: id,
        url,
        publicId
      }
    })

    return NextResponse.json(image)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Image upload failed" },
      { status: 500 }
    )
  }
}



export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await context.params
    const { searchParams } = new URL(req.url)

    const imageId = searchParams.get("imageId")
    const publicId = searchParams.get("publicId")

    if (!imageId || !publicId) {
      return NextResponse.json(
        { error: "Missing imageId or publicId" },
        { status: 400 }
      )
    }

    await cloudinary.uploader.destroy(publicId)

    await prisma.vehicleImage.delete({
      where: { id: imageId }
    })

    return NextResponse.json({ success: true })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    )
  }

}