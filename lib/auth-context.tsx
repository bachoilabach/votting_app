"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getCredentials } from "./credentials"

type User = {
  id: string
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Get credentials to validate login
      const credentials = getCredentials()
      const credential = credentials.find((c) => (c.email === email || c.username === email) && c.password === password)

      if (credential) {
        const authUser = {
          id: credential.id,
          name: credential.username,
          email: credential.email,
        }

        setUser(authUser)
        setIsAuthenticated(true)
        localStorage.setItem("user", JSON.stringify(authUser))
        return Promise.resolve()
      } else {
        return Promise.reject("Invalid email or password")
      }
    } catch (error) {
      return Promise.reject("Login failed")
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
