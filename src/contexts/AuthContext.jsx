import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("hr-tool-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple validation - in real app, this would be handled by backend
    if (email && password) {
      const userData = {
        id: "1",
        name: email.split("@")[0],
        email: email,
      }

      setUser(userData)
      localStorage.setItem("hr-tool-user", JSON.stringify(userData))
      localStorage.setItem("hr-tool-token", "dummy-jwt-token")
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const signup = async (name, email, password) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const userData = {
      id: Date.now().toString(),
      name: name,
      email: email,
    }

    setUser(userData)
    localStorage.setItem("hr-tool-user", JSON.stringify(userData))
    localStorage.setItem("hr-tool-token", "dummy-jwt-token")
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("hr-tool-user")
    localStorage.removeItem("hr-tool-token")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
