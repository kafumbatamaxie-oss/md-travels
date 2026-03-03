import BackgroundVideo from "@/components/BackgroundVideo";
import WinelandsSection from "./WinelandsSection";
import ContractSection from "./ContractSection";

export default function PartnershipArea() {
  return (
    <section className="relative py-24">

      {/* Background Video */}
      <BackgroundVideo />

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 px-4">
        <WinelandsSection />
        <ContractSection />
      </div>

    </section>
  );
}