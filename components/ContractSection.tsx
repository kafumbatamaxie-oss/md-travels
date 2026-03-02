import ContractDialog from "./ContractDialog";

export default function ContractSection() {
  return (
    <section className="py-24 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-4">
        Charter Partnership Agreement
      </h2>

      <p className="max-w-2xl mx-auto text-gray-600 mb-8">
        Partner with MD Shuttles for reliable hotel
        transportation services including airport transfers,
        tours, and executive transport solutions across
        the Western Cape.
      </p>

      <ul className="space-y-2 mb-8">
        <li>✅ Airport Transfers</li>
        <li>✅ City & Winelands Tours</li>
        <li>✅ Executive Vehicles</li>
        <li>✅ Long-term Partnership</li>
      </ul>

      <ContractDialog />
    </section>
  );
}