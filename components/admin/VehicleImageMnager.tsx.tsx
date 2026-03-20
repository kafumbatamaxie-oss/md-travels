"use client"

import { CldUploadWidget } from "next-cloudinary"
import { useState } from "react"

interface Props {
  vehicleId: string
  images: any[]
  refresh: () => void
}

export default function VehicleImageManager({
  vehicleId,
  images,
  refresh
}: Props) {

  const [uploading, setUploading] = useState(false)



  async function handleUpload(result: any) {

    const url = result.info.secure_url
    const publicId = result.info.public_id

    setUploading(true)

    await fetch(`/api/admin/vehicles/${vehicleId}/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url,
        publicId
      })
    })

    setUploading(false)
    refresh()
  }



  async function deleteImage(image: any) {

    await fetch(
      `/api/admin/vehicles/${vehicleId}/images?imageId=${image.id}&publicId=${image.publicId}`,
      {
        method: "DELETE"
      }
    )

    refresh()
  }



  return (
    <div className="space-y-4">

      <h2 className="font-semibold text-lg">
        Vehicle Images
      </h2>



      {/* Upload Button */}

      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!}
        onSuccess={handleUpload}
      >

        {({ open }) => {

          return (
            <button
              onClick={() => open()}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Upload Image
            </button>
          )

        }}

      </CldUploadWidget>



      {/* Images */}

      <div className="grid grid-cols-4 gap-4">

        {images?.map((img) => (

          <div key={img.id} className="relative">

            <img
              src={img.url}
              className="rounded border"
            />

            <button
              onClick={() => deleteImage(img)}
              className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
            >
              X
            </button>

          </div>

        ))}

      </div>



      {uploading && (
        <p className="text-sm text-gray-500">
          Uploading...
        </p>
      )}

    </div>
  )
}