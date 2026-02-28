"use client"

import { useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/admin/Sidebar"
import AdminNavbar from "@/components/admin/AdminNavbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
 

  const [mobileOpen, setMobileOpen] = useState(false)


  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 md:ml-20 lg:ml-64 flex flex-col">

        <AdminNavbar onMenuClick={() => setMobileOpen(true)} />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  )
}