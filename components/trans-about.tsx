import { Building2, GraduationCap, Briefcase } from "lucide-react"

export function TransAbout() {
  return (
    <section id="about" className="bg-muted/50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-foreground">
              Company Overview
            </span>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Your Trusted Transport Partner in the Western Cape
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              MD Travels is a Western Cape-based professional transport service
              provider offering safe, insured, and reliable passenger transport
              solutions. We are committed to delivering high-quality transport
              services that meet the strict compliance, safety, and reliability
              standards required by Government institutions, educational
              facilities, and corporate clients.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 text-center">
                <Building2 className="h-7 w-7 text-accent" />
                <span className="text-sm font-semibold text-foreground">
                  Government
                </span>
                <span className="text-xs text-muted-foreground">
                  Municipal transport
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 text-center">
                <GraduationCap className="h-7 w-7 text-accent" />
                <span className="text-sm font-semibold text-foreground">
                  Education
                </span>
                <span className="text-xs text-muted-foreground">
                  Schools & universities
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 text-center">
                <Briefcase className="h-7 w-7 text-accent" />
                <span className="text-sm font-semibold text-foreground">
                  Corporate
                </span>
                <span className="text-xs text-muted-foreground">
                  Staff & executive
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl bg-primary p-8 text-primary-foreground md:p-10">
              <h3 className="text-2xl font-bold">Why MD Travels?</h3>
              <ul className="mt-6 flex flex-col gap-4">
                {[
                  "Fully insured fleet of modern vehicles",
                  "All drivers hold valid PDP / PrDP licenses",
                  "Compliance with all transport regulations",
                  "Strict safety & maintenance standards",
                  "Licensed & experienced professional drivers",
                  "24/7 availability for all transport needs",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                      {"✓"}
                    </span>
                    <span className="text-sm leading-relaxed text-primary-foreground/85">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
