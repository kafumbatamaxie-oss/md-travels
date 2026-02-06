import { ReactNode } from "react"
import Link from "next/link"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-background p-6">
        <h2 className="text-xl font-bold mb-6">MD Travels Admin</h2>

        <nav className="space-y-3">
          <Link href="/admin" className="block hover:text-secondary">
            Overview
          </Link>
          <Link href="https://md-invoice-gen.vercel.app"  className="block hover:text-secondary">
            Create an Invoice
          </Link>
          <Link href="/admin/services" className="block hover:text-secondary">
            Services
          </Link>
          <Link href="/admin/bookings" className="block hover:text-secondary">
            Bookings
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
