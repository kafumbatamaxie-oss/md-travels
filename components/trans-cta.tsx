'use client';

import { Phone, Mail, MapPin } from "lucide-react"

export function TransCTA() {
  return (
    <section id="contact" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="overflow-hidden rounded-2xl bg-card shadow-lg">
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col justify-center p-8 md:p-12">
              <span className="inline-block w-fit rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-foreground">
                Get in Touch
              </span>
              <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Partner with MD Travels
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Partner with MD Travels for safe, reliable, and professional
                transport solutions. Contact us today to discuss your transport
                requirements.
              </p>

              <div className="mt-8 flex flex-col gap-5">
                <a
                  href="tel:+27769206481"
                  className="flex items-center gap-4 text-foreground transition-colors hover:text-accent"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </span>
                  <div>
                    <span className="block text-xs font-medium text-muted-foreground">
                      Phone
                    </span>
                    <span className="text-sm font-semibold">
                      +27 76 920 6481
                    </span>
                  </div>
                </a>
                <a
                  href="mailto:info@sayovi.org.za"
                  className="flex items-center gap-4 text-foreground transition-colors hover:text-accent"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </span>
                  <div>
                    <span className="block text-xs font-medium text-muted-foreground">
                      Email
                    </span>
                    <span className="text-sm font-semibold">
                      info@sayovi.org.za
                    </span>
                  </div>
                </a>
                <div className="flex items-center gap-4 text-foreground">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </span>
                  <div>
                    <span className="block text-xs font-medium text-muted-foreground">
                      Location
                    </span>
                    <span className="text-sm font-semibold">
                      Western Cape, South Africa
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center bg-primary p-8 md:p-12">
              <h3 className="text-xl font-bold text-primary-foreground">
                Request a Quote
              </h3>
              <p className="mt-2 text-sm text-primary-foreground/70">
                Fill in your details and we will get back to you promptly.
              </p>
              <form className="mt-6 flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="rounded-lg border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent focus:outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="rounded-lg border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent focus:outline-none"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="rounded-lg border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent focus:outline-none"
                />
                <textarea
                  placeholder="Tell us about your transport requirements..."
                  rows={4}
                  className="resize-none rounded-lg border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent focus:outline-none"
                />
                <button
                  type="submit"
                  className="mt-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
                >
                  Send Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
