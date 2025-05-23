"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAuth } from "@/lib/auth-context"

const votingOptions = [
  { id: 1, text: "Option A", color: "bg-blue-500 hover:bg-blue-600 border-blue-600" },
  { id: 2, text: "Option B", color: "bg-green-500 hover:bg-green-600 border-green-600" },
  { id: 3, text: "Option C", color: "bg-purple-500 hover:bg-purple-600 border-purple-600" },
  { id: 4, text: "Option D", color: "bg-orange-500 hover:bg-orange-600 border-orange-600" },
]

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isVoting, setIsVoting] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Check if user has already voted
    const userVote = localStorage.getItem(`userVote_${user?.id}`)
    if (userVote) {
      setHasVoted(true)
      // Redirect to results if already voted
      router.push("/results")
    }
  }, [isAuthenticated, router, user?.id])

  const handleOptionSelect = (optionId: number) => {
    if (!hasVoted && !isVoting) {
      setSelectedOption(optionId)
    }
  }

  const handleVoteClick = () => {
    if (selectedOption && !hasVoted && !isVoting) {
      setShowConfirmDialog(true)
    }
  }

  const handleConfirmVote = async () => {
    if (selectedOption && !hasVoted && !isVoting) {
      setShowConfirmDialog(false)
      setIsVoting(true)

      // Simulate vote submission
      setTimeout(() => {
        // Store the vote with user ID to prevent multiple votes
        localStorage.setItem(`userVote_${user?.id}`, selectedOption.toString())
        localStorage.setItem("userVote", selectedOption.toString())
        setHasVoted(true)

        // Redirect to results
        router.push("/results")
      }, 1000)
    }
  }

  const handleCancelVote = () => {
    setShowConfirmDialog(false)
  }

  const getSelectedOptionText = () => {
    if (selectedOption) {
      const option = votingOptions.find((opt) => opt.id === selectedOption)
      return option?.text || ""
    }
    return ""
  }

  if (!isAuthenticated || hasVoted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Option</h1>
          <p className="text-xl text-gray-600">Select one option and click Vote to submit</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {votingOptions.map((option) => (
            <Card key={option.id} className="overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <button
                  onClick={() => handleOptionSelect(option.id)}
                  disabled={isVoting || hasVoted}
                  className={`w-full h-32 text-2xl font-bold text-white transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border-4 relative ${
                    selectedOption === option.id
                      ? `${option.color.split(" ")[0]} border-white shadow-lg scale-105`
                      : `${option.color} border-transparent`
                  }`}
                >
                  {option.text}
                  {selectedOption === option.id && (
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                  )}
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={handleVoteClick}
            disabled={!selectedOption || isVoting || hasVoted}
            size="lg"
            className="px-12 py-4 text-xl font-bold bg-gray-800 hover:bg-gray-900 disabled:opacity-50"
          >
            {isVoting ? (
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                Submitting Vote...
              </div>
            ) : (
              "VOTE"
            )}
          </Button>

          {selectedOption && !isVoting && (
            <p className="mt-4 text-lg text-gray-600">
              You selected: <span className="font-bold">{getSelectedOptionText()}</span>
            </p>
          )}

          {!selectedOption && <p className="mt-4 text-gray-500">Please select an option above</p>}
        </div>

        {/* Confirmation Dialog */}
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Confirm Your Vote</DialogTitle>
              <DialogDescription className="text-base">
                Are you sure you want to vote for{" "}
                <span className="font-bold text-gray-900">{getSelectedOptionText()}</span>?
              </DialogDescription>
            </DialogHeader>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-4">
              <p className="text-yellow-800 text-sm">
                ⚠️ <strong>Warning:</strong> You can only vote once. This action cannot be undone.
              </p>
            </div>
            <DialogFooter className="flex gap-3">
              <Button variant="outline" onClick={handleCancelVote} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleConfirmVote} className="flex-1 bg-green-600 hover:bg-green-700">
                Confirm Vote
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
