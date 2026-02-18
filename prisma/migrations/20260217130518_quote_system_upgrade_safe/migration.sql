/*
  Warnings:

  - You are about to drop the column `destination` on the `Quote` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_serviceId_fkey";

-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "destination",
ADD COLUMN     "destinationAddress" TEXT,
ADD COLUMN     "destinationLat" DOUBLE PRECISION,
ADD COLUMN     "destinationLng" DOUBLE PRECISION,
ADD COLUMN     "distanceKm" DOUBLE PRECISION,
ADD COLUMN     "estimatedPrice" DOUBLE PRECISION,
ADD COLUMN     "pdfUrl" TEXT,
ADD COLUMN     "pickupLat" DOUBLE PRECISION,
ADD COLUMN     "pickupLng" DOUBLE PRECISION,
ADD COLUMN     "pricingType" TEXT,
ADD COLUMN     "vehicleCategory" TEXT,
ALTER COLUMN "serviceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;
