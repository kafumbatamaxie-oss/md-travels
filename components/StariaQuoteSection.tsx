import StariaSlider from "./StariaSlider";
import StariaDialog from "./StariaDialog";

export default function StariaQuoteSection() {
  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6 items-center">

        <StariaSlider />

        <div>
          <h2 className="text-3xl font-bold mb-4">
            Hyundai Staria Day Trip Package
          </h2>

          <p className="text-gray-600 mb-6">
            Luxury 8-seater transport with professional
            driver for your Cape Winelands experience.
          </p>

          <ul className="space-y-2 mb-6">
            <li>✅ Hout Bay → Franschhoek</li>
            <li>✅ Evening Return Service</li>
            <li>✅ Flexible Schedule</li>
            <li>✅ Professional Driver</li>
          </ul>

          <p className="text-2xl font-bold mb-6">
            R2,200 / Day
          </p>

          <StariaDialog />
        </div>
      </div>
    </section>
  );
}