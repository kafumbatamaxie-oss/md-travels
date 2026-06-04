"use client"

import { CldUploadWidget }
  from "next-cloudinary"

export default function
VehicleImageUploader({
  onUploaded,
}: {
  onUploaded: (
    url: string,
    publicId: string
  ) => void
}) {
  return (
    <CldUploadWidget
      uploadPreset={
        process.env
          .NEXT_PUBLIC_CLOUDINARY_PRESET
      }
      onSuccess={(result: any) => {

        const info =
          result.info

        onUploaded(
          info.secure_url,
          info.public_id
        )
      }}
    >
      {({ open }) => (
        <button
          onClick={() => open()}
          className="bg-black text-white px-5 py-3 rounded-xl"
        >
          Upload Image
        </button>
      )}
    </CldUploadWidget>
  )
}