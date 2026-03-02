import FleetSlider from "./FleetSlider";
import ProposalDialog from "./ProposalDialog";

export default function ProposalSection() {
  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">

        <FleetSlider />

        <div>
          <h2 className="text-3xl font-bold mb-4">
            Transportation Partnership Proposal
          </h2>

          <p className="text-gray-600 mb-6">
            Malipheze Dlunge Transport provides reliable,
            safe and flexible mini-bus transport solutions
            for organizations, schools and events.
          </p>

          <ul className="space-y-2 mb-6">
            <li>✅ 15-Seater Mini Buses</li>
            <li>✅ Professional Drivers</li>
            <li>✅ Short & Long-Term Contracts</li>
            <li>✅ Custom Transport Solutions</li>
          </ul>

          <ProposalDialog />
        </div>
      </div>
    </section>
  );
}