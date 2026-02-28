"use client"

import { UserButton, useUser } from "@clerk/nextjs"
import { Menu } from "lucide-react"

interface Props {
  onMenuClick?: () => void
}

export default function AdminNavbar({ onMenuClick }: Props) {
  const { user } = useUser()

  const firstName = user?.firstName || "Admin"

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 18) return "Good Afternoon"
    return "Good Evening"
  }

  return (
    <div className="w-full bg-white border-b px-4 md:px-6 h-16 flex items-center justify-between">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-3 min-w-0">

        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>

        {/* Greeting */}
        <div className="min-w-0">
          <p className="text-xs sm:text-sm text-gray-500 truncate">
            {getGreeting()}
          </p>

          <p className="text-sm sm:text-lg font-semibold truncate">
            Welcome back, {firstName} 👋
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-9 h-9 sm:w-10 sm:h-10",
            },
          }}
        />
      </div>
    </div>
  )
}