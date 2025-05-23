"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { Progress } from "@/components/ui/progress"

const votingResults = [
  { id: 1, text: "Option A", votes: 45, color: "bg-blue-500" },
  { id: 2, text: "Option B", votes: 32, color: "bg-green-500" },
  { id: 3, text: "Option C", votes: 28, color: "bg-purple-500" },
  { id: 4, text: "Option D", votes: 38, color: "bg-orange-500" },
]

export default function ResultsPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [userVote, setUserVote] = useState<number | null>(null)
  const [hasVoted, setHasVoted] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Get user's vote from localStorage
    const vote = localStorage.getItem(`userVote_${user?.id}`)
    if (vote) {
      setUserVote(Number.parseInt(vote))
      setHasVoted(true)
    } else {
      // If user hasn't voted, redirect to voting page
      router.push("/dashboard")
    }
  }, [isAuthenticated, router, user?.id])

  const totalVotes = votingResults.reduce((sum, option) => sum + option.votes, 0)

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem("user")
    router.push("/")
  }

  const handleViewAccounts = () => {
    router.push("/accounts")
  }

  if (!hasVoted) {
    return null // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="shadow-xl">
          <CardHeader className="text-center bg-gray-50">
            <CardTitle className="text-3xl font-bold">Voting Results</CardTitle>
            <CardDescription className="text-lg">
              Total votes: {totalVotes}
              {userVote && (
                <span className="block mt-2 text-green-600 font-medium">
                  ✓ You voted for Option {String.fromCharCode(64 + userVote)}
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              {votingResults.map((option) => {
                const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0
                const isUserChoice = userVote === option.id

                return (
                  <div
                    key={option.id}
                    className={`p-4 rounded-lg border-2 ${
                      isUserChoice ? "border-green-500 bg-green-50" : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded ${option.color}`}></div>
                        <span className="text-xl font-semibold">{option.text}</span>
                        {isUserChoice && (
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                            Your Vote
                          </span>
                        )}
                      </div>
                      <span className="text-lg font-bold">
                        {percentage}% ({option.votes} votes)
                      </span>
                    </div>
                    <Progress value={percentage} className="h-3" />
                  </div>
                )
              })}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-8">
              <p className="text-yellow-800 font-medium text-center">⚠️ You have already voted and cannot vote again</p>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <Button onClick={handleViewAccounts} variant="outline" size="lg" className="px-8">
                View Accounts
              </Button>
              <Button onClick={handleLogout} size="lg" className="px-8">
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
