export interface PollOption {
  id: number
  text: string
  votes: number
}

export interface Poll {
  id: number
  title: string
  options: PollOption[]
  ended: boolean
  userVoted: boolean
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: string
  status: string
  lastActive: string
  votesSubmitted?: number
}

export interface Credential {
  id: string
  username: string
  email: string
  password: string
}
