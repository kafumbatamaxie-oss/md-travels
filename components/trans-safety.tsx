import { ShieldCheck, Award, Wrench, BadgeCheck, FileCheck } from "lucide-react"

const safetyItems = [
  {
    icon: BadgeCheck,
    title: "Licensed Drivers",
    text: "All drivers hold valid PDP / PrDP licenses and are experienced professionals.",
  },
  {
    icon: ShieldCheck,
    title: "Fully Insured",
    text: "Every vehicle in our fleet is comprehensively insured for passenger safety.",
  },
  {
    icon: FileCheck,
    title: "Regulatory Compliance",
    text: "Full compliance with all national and provincial transport regulations.",
  },
  {
    icon: Wrench,
    title: "Maintenance Standards",
    text: "Strict safety and maintenance schedules to keep our fleet in peak condition.",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    text: "Ongoing quality audits and driver assessments to maintain service excellence.",
  },
]

export function TransSafety() {
  return (
    <section id="safety" className="bg-primary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            Safety First
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            Safety & Compliance
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/70">
            Your safety is our top priority. We adhere to the highest standards
            of transport compliance and vehicle maintenance.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {safetyItems.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 text-center"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/15">
                <item.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-sm font-bold text-primary-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/65">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
