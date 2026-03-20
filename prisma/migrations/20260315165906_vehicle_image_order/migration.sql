-- AlterEnum
ALTER TYPE "BookingStatus" ADD VALUE 'QUOTE_HOLD';

-- AlterEnum
ALTER TYPE "DriverStatus" ADD VALUE 'ON_LEAVE';

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "quoteId" TEXT;

-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "licenseType" TEXT,
ADD COLUMN     "maxDailyHours" INTEGER NOT NULL DEFAULT 10;

-- CreateTable
CREATE TABLE "VehicleImage" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VehicleImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VehicleImage_vehicleId_idx" ON "VehicleImage"("vehicleId");

-- CreateIndex
CREATE INDEX "Booking_vehicleId_startDate_endDate_idx" ON "Booking"("vehicleId", "startDate", "endDate");

-- CreateIndex
CREATE INDEX "Quote_customerId_idx" ON "Quote"("customerId");

-- AddForeignKey
ALTER TABLE "VehicleImage" ADD CONSTRAINT "VehicleImage_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
