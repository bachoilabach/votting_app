import type { Poll, User } from "./types"

// Mock data for polls
const mockPolls: Poll[] = [
  {
    id: 1,
    title: "What feature should we build next?",
    ended: false,
    userVoted: false,
    options: [
      { id: 1, text: "Dark mode", votes: 42 },
      { id: 2, text: "Mobile app", votes: 28 },
      { id: 3, text: "API integration", votes: 16 },
      { id: 4, text: "Analytics dashboard", votes: 22 },
    ],
  },
  {
    id: 2,
    title: "Best frontend framework?",
    ended: false,
    userVoted: false,
    options: [
      { id: 1, text: "React", votes: 120 },
      { id: 2, text: "Vue", votes: 80 },
      { id: 3, text: "Angular", votes: 40 },
      { id: 4, text: "Svelte", votes: 60 },
    ],
  },
  {
    id: 3,
    title: "Preferred database?",
    ended: true,
    userVoted: true,
    options: [
      { id: 1, text: "PostgreSQL", votes: 85 },
      { id: 2, text: "MongoDB", votes: 65 },
      { id: 3, text: "MySQL", votes: 45 },
      { id: 4, text: "SQLite", votes: 25 },
    ],
  },
]

// Generate 200 mock users
const generateMockUsers = (): User[] => {
  const roles = ["User", "Moderator", "Admin"]
  const statuses = ["Active", "Inactive", "Suspended"]
  const domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "company.com"]
  const firstNames = [
    "John",
    "Jane",
    "Michael",
    "Emily",
    "David",
    "Sarah",
    "Robert",
    "Lisa",
    "William",
    "Emma",
    "James",
    "Olivia",
    "Daniel",
    "Sophia",
    "Matthew",
    "Ava",
    "Christopher",
    "Isabella",
    "Andrew",
    "Mia",
  ]
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Miller",
    "Davis",
    "Garcia",
    "Rodriguez",
    "Wilson",
    "Martinez",
    "Anderson",
    "Taylor",
    "Thomas",
    "Hernandez",
    "Moore",
    "Martin",
    "Jackson",
    "Thompson",
    "White",
  ]

  const passwords = [
    "password123",
    "admin2024",
    "user1234",
    "welcome123",
    "qwerty123",
    "abc123456",
    "password1",
    "123456789",
    "letmein123",
    "admin123",
  ]

  const users: User[] = []

  for (let i = 1; i <= 200; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const name = `${firstName} ${lastName}`
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}@${domains[Math.floor(Math.random() * domains.length)]}`
    const role = roles[Math.floor(Math.random() * roles.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]

    // Generate a random date within the last year
    const now = new Date()
    const lastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
    const lastActive = new Date(lastYear.getTime() + Math.random() * (now.getTime() - lastYear.getTime())).toISOString()

    const password = passwords[Math.floor(Math.random() * passwords.length)]

    users.push({
      id: i.toString(),
      name,
      email,
      password,
      role,
      status,
      lastActive,
      votesSubmitted: Math.floor(Math.random() * 50),
    })
  }

  return users
}

// Mock API function to fetch polls
export const fetchPolls = (): Promise<Poll[]> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve(mockPolls)
    }, 500)
  })
}

// Mock API function to fetch users
export const fetchUsers = (): Promise<User[]> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve(generateMockUsers())
    }, 800)
  })
}
