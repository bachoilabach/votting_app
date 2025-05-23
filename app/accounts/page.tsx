"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { Search, Copy, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { getCredentials } from "@/lib/credentials"
import type { Credential } from "@/lib/types"

export default function AccountsPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [credentials, setCredentials] = useState<Credential[]>([])
  const [filteredCredentials, setFilteredCredentials] = useState<Credential[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({})
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Get the predefined credentials
    const allCredentials = getCredentials()
    setCredentials(allCredentials)
    setFilteredCredentials(allCredentials)
  }, [isAuthenticated, router])

  useEffect(() => {
    // Filter credentials based on search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const filtered = credentials.filter(
        (cred) => cred.username.toLowerCase().includes(query) || cred.email.toLowerCase().includes(query),
      )
      setFilteredCredentials(filtered)
    } else {
      setFilteredCredentials(credentials)
    }
  }, [credentials, searchQuery])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const toggleAllPasswords = () => {
    if (
      Object.keys(showPasswords).length === filteredCredentials.length &&
      Object.values(showPasswords).every((value) => value === true)
    ) {
      // If all passwords are shown, hide all
      setShowPasswords({})
    } else {
      // Otherwise show all passwords
      const allShown: { [key: string]: boolean } = {}
      filteredCredentials.forEach((cred) => {
        allShown[cred.id] = true
      })
      setShowPasswords(allShown)
    }
  }

  const goBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button onClick={goBack} variant="outline" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login Credentials</CardTitle>
            <CardDescription>List of accounts and passwords for login</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Search accounts..." className="pl-8" value={searchQuery} onChange={handleSearch} />
              </div>
              <Button variant="outline" onClick={toggleAllPasswords}>
                {Object.keys(showPasswords).length === filteredCredentials.length &&
                Object.values(showPasswords).every((value) => value === true)
                  ? "Hide All Passwords"
                  : "Show All Passwords"}
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Password</TableHead>
                    <TableHead className="w-[100px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCredentials.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No accounts found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCredentials.map((cred, index) => (
                      <TableRow key={cred.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{cred.username}</TableCell>
                        <TableCell>{cred.email}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded flex-1">
                              {showPasswords[cred.id] ? cred.password : "••••••••"}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => togglePasswordVisibility(cred.id)}
                            >
                              {showPasswords[cred.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                `Username: ${cred.username}\nEmail: ${cred.email}\nPassword: ${cred.password}`,
                                cred.id,
                              )
                            }
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            {copiedId === cred.id ? "Copied!" : "Copy"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
