import BookingDialog from "./BookingDialog";
import Image from "next/image";

export default function SpecialPackage() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6">

        <Image
          src="/images/toyota36seater.png"
          alt="65 Seater Bus"
          width={600}
          height={400}
          className="rounded-2xl object-cover"
        />

        <div>
          <h2 className="text-3xl font-bold mb-4">
            Cape Town Special Package
          </h2>

          <p className="mb-4 text-gray-600">
            Luxury 65-Seater Bus experience including airport transfers
            and daily Cape Town tours.
          </p>

          <ul className="space-y-2 mb-6">
            <li>✅ Airport Transfer (Arrival)</li>
            <li>✅ Daily Trips – from 1+ Days</li>
            <li>✅ Return Airport Transfer</li>
            <li>✅ Professional Driver</li>
            <li>✅ Fuel & Parking Included</li>
          </ul>

          <p className="text-2xl font-bold mb-6">
            Total: R20,500
          </p>

          <BookingDialog />
        </div>
      </div>
    </section>
  );
}