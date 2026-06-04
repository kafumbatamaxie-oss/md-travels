"use client"

import { useEffect }
from "react"

import { useState }
from "react"

import { useParams }
from "next/navigation"

import VehicleImageUploader
from "@/components/admin/VehicleImageUploader"

export default function
VehicleImagesPage() {

  const params =
    useParams()

  const id =
    params.id as string

  const [images, setImages] =
    useState<any[]>([])

  async function loadImages() {

    const res =
      await fetch(
        `/api/admin/vehicles/${id}`
      )

    const vehicle =
      await res.json()

    setImages(
      vehicle.images || []
    )
  }

  useEffect(() => {
    loadImages()
  }, [id])

  async function saveImage(
    url: string,
    publicId: string
  ) {

    await fetch(
      `/api/admin/vehicles/${id}/images`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          url,
          publicId,
        }),
      }
    )

    loadImages()
  }

  async function removeImage(
    imageId: string
  ) {

    await fetch(
      `/api/admin/vehicle-images/${imageId}`,
      {
        method: "DELETE",
      }
    )

    loadImages()
  }

  return (

    <div className="max-w-6xl mx-auto p-6">

      <div className="flex justify-between mb-8">

        <h1 className="text-3xl font-black">
          Vehicle Images
        </h1>

        <VehicleImageUploader
          onUploaded={saveImage}
        />

      </div>

      <div className="grid md:grid-cols-4 gap-4">

        {images.map(
          (image) => (

            <div
              key={image.id}
              className="border rounded-xl overflow-hidden"
            >

              <img
                src={image.url}
                alt=""
                className="w-full h-48 object-cover"
              />

              <button
                onClick={() =>
                  removeImage(
                    image.id
                  )
                }
                className="w-full bg-red-500 text-white py-2"
              >
                Delete
              </button>

            </div>
          )
        )}

      </div>

    </div>
  )
}