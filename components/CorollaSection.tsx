import Image from "next/image";
import CorollaDialog from "./CorollaDialog";

export default function CorollaSection() {
  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6 items-center">

        {/* LEFT IMAGE */}
        <div className="w-full">
          <Image
            src="/corolla.png"
            alt="Toyota Corolla"
            width={600}
            height={400}
            className="rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Toyota Corolla 4-Seater
          </h2>

          <p className="text-gray-600 mb-6">
            Comfortable and reliable 4-seater transport perfect for
            airport transfers, business trips and private travel
            around Cape Town and the Western Cape.
          </p>

          <ul className="space-y-2 mb-6">
            <li>✅ Professional Driver</li>
            <li>✅ Air-Conditioned Comfort</li>
            <li>✅ Airport Transfers</li>
            <li>✅ Flexible Booking</li>
          </ul>

          <div className="mb-6">
            <p className="text-xl font-semibold">
              Half Day — R1800
            </p>
            <p className="text-xl font-semibold">
              Full Day — R3600
            </p>
          </div>

          <CorollaDialog />
        </div>

      </div>
    </section>
  );
}