import type { Credential } from "./types"

// Predefined list of credentials
const predefinedCredentials: Credential[] = [
  {
    id: "1",
    username: "admin",
    email: "admin@example.com",
    password: "admin123",
  },
  {
    id: "2",
    username: "user1",
    email: "user1@example.com",
    password: "password123",
  },
  {
    id: "3",
    username: "user2",
    email: "user2@example.com",
    password: "user2pass",
  },
  {
    id: "4",
    username: "moderator",
    email: "moderator@example.com",
    password: "mod2024",
  },
  {
    id: "5",
    username: "john.doe",
    email: "john.doe@example.com",
    password: "johndoe123",
  },
  {
    id: "6",
    username: "jane.smith",
    email: "jane.smith@example.com",
    password: "janesmith456",
  },
  {
    id: "7",
    username: "test.user",
    email: "test@example.com",
    password: "test1234",
  },
  {
    id: "8",
    username: "demo",
    email: "demo@example.com",
    password: "demo2024",
  },
  {
    id: "9",
    username: "guest",
    email: "guest@example.com",
    password: "guest123",
  },
  {
    id: "10",
    username: "support",
    email: "support@example.com",
    password: "support2024",
  },
  {
    id: "11",
    username: "manager",
    email: "manager@example.com",
    password: "manager123",
  },
  {
    id: "12",
    username: "developer",
    email: "developer@example.com",
    password: "dev2024",
  },
  {
    id: "13",
    username: "tester",
    email: "tester@example.com",
    password: "test2024",
  },
  {
    id: "14",
    username: "analyst",
    email: "analyst@example.com",
    password: "analyst123",
  },
  {
    id: "15",
    username: "marketing",
    email: "marketing@example.com",
    password: "market2024",
  },
  {
    id: "16",
    username: "sales",
    email: "sales@example.com",
    password: "sales2024",
  },
  {
    id: "17",
    username: "finance",
    email: "finance@example.com",
    password: "finance123",
  },
  {
    id: "18",
    username: "hr",
    email: "hr@example.com",
    password: "hr2024",
  },
  {
    id: "19",
    username: "executive",
    email: "executive@example.com",
    password: "exec2024",
  },
  {
    id: "20",
    username: "customer",
    email: "customer@example.com",
    password: "customer123",
  },
]

export const getCredentials = (): Credential[] => {
  return predefinedCredentials
}
