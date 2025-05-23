"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

export default function Header() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/dashboard" className="font-bold text-xl">
          VoteHub
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
            Dashboard
          </Link>
          <Link href="/results" className="text-gray-600 hover:text-gray-900">
            Results
          </Link>
          <Link href="/accounts" className="text-gray-600 hover:text-gray-900">
            Accounts
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{user?.name}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
