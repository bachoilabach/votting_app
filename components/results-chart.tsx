"use client"

import type { Poll } from "@/lib/types"
import { Progress } from "@/components/ui/progress"

interface ResultsChartProps {
  poll: Poll
}

export default function ResultsChart({ poll }: ResultsChartProps) {
  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0)

  // Generate a different color for each option
  const getColor = (index: number) => {
    const colors = ["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500", "bg-indigo-500"]
    return colors[index % colors.length]
  }

  return (
    <div className="space-y-4">
      {poll.options.map((option, index) => {
        const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0

        return (
          <div key={option.id} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{option.text}</span>
              <span className="font-medium">
                {percentage}% ({option.votes} votes)
              </span>
            </div>
            <Progress value={percentage} className={`h-2 ${getColor(index)}`} />
          </div>
        )
      })}
    </div>
  )
}
