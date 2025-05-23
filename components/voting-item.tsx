"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { Poll } from "@/lib/types"
import ResultsChart from "@/components/results-chart"

interface VotingItemProps {
  poll: Poll
  onVote: (pollId: number, optionId: number) => void
  showResults: boolean
}

export default function VotingItem({ poll, onVote, showResults }: VotingItemProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [voted, setVoted] = useState(poll.userVoted)
  const [showResultsLocal, setShowResultsLocal] = useState(showResults)

  const handleVote = () => {
    if (selectedOption !== null) {
      onVote(poll.id, selectedOption)
      setVoted(true)
      setShowResultsLocal(true)
    }
  }

  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0)

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gray-50 pb-2">
        <CardTitle>{poll.title}</CardTitle>
        <CardDescription>
          {poll.ended ? "Ended" : "Active"} • Total votes: {totalVotes}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {voted || showResultsLocal ? (
          <ResultsChart poll={poll} />
        ) : (
          <div className="space-y-4">
            <RadioGroup
              value={selectedOption?.toString()}
              onValueChange={(value) => setSelectedOption(Number.parseInt(value))}
            >
              {poll.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id.toString()} id={`option-${option.id}`} />
                  <Label htmlFor={`option-${option.id}`} className="flex-1">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <div className="flex justify-between mt-4">
              <Button variant="outline" size="sm" onClick={() => setShowResultsLocal(true)}>
                View Results
              </Button>
              <Button size="sm" onClick={handleVote} disabled={selectedOption === null}>
                Vote
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
