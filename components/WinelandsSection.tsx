import WinelandsDialog from "./WinelandsDialog";

export default function WinelandsSection() {
  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-bold mb-4">
          Airport Shuttle + Winelands Experience
        </h2>

        <p className="text-gray-600 mb-8">
          Enjoy seamless airport transfers and explore
          Cape Town’s famous wine estates with our guided tours.
        </p>

        <ul className="space-y-2 mb-8">
          <li>✅ Return Airport Shuttle</li>
          <li>✅ Wine Tasting Experience</li>
          <li>✅ Half or Full Day Options</li>
          <li>✅ Professional Driver</li>
        </ul>

        <WinelandsDialog />
      </div>
    </section>
  );
}