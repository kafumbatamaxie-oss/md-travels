import {
  Building,
  Bus,
  GraduationCap,
  Briefcase,
  CalendarDays,
  MapPin,
  FileText,
} from "lucide-react"

const services = [
  {
    icon: Building,
    title: "Government & Municipal Transport",
    description:
      "Reliable transport solutions for government institutions and municipal operations.",
  },
  {
    icon: GraduationCap,
    title: "School Transport Services",
    description:
      "Safe and compliant student transport for schools across the Western Cape.",
  },
  {
    icon: Bus,
    title: "College & University Student Transport",
    description:
      "Dependable daily transport for higher education students and staff.",
  },
  {
    icon: Briefcase,
    title: "Corporate & Staff Transport",
    description:
      "Executive and staff shuttle services for businesses and organisations.",
  },
  {
    icon: MapPin,
    title: "Shuttle & Charter Services",
    description:
      "Flexible shuttle and charter options for any destination or schedule.",
  },
  {
    icon: CalendarDays,
    title: "Events, Conferences & Tours",
    description:
      "Group transport for events, conferences, team-building, and tours.",
  },
  {
    icon: FileText,
    title: "Daily, Weekly & Contract-Based Transport",
    description:
      "Custom contract arrangements tailored to your schedule and route requirements.",
  },
]

export function TransServices() {
  return (
    <section id="services" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-foreground">
            What We Offer
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Services Offered
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Comprehensive transport solutions for every need, from daily
            commutes to large-scale event logistics.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/40 hover:shadow-md"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <service.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-sm font-bold text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
