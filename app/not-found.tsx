import { Navbar } from "@/components/navbar"
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl font-bold gradient-gold mb-6">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
          <p className="text-lg text-text-secondary mb-12">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-secondary hover:opacity-90 text-primary rounded-lg font-semibold transition-all"
          >
            Return Home
          </Link>
        </div>
      </section>
    </main>
  )
}
