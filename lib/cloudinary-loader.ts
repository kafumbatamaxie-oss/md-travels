export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  const q = quality || 75

  if (!src.includes("res.cloudinary.com")) {
    return src
  }

  const parts = src.split("/upload/")
  if (parts.length !== 2) return src

  return `${parts[0]}/upload/f_auto,q_${q},w_${width}/${parts[1]}`
}