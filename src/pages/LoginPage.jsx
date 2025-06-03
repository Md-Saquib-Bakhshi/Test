import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import LoginForm from "../components/Auth/LoginForm"

function LoginPage() {
  const [error, setError] = useState("")
  const { login, user, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }
  }, [user, navigate])

  const handleLogin = async (email, password) => {
    setError("")
    try {
      const success = await login(email, password)
      if (success) {
        navigate("/dashboard")
      } else {
        setError("Invalid email or password")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    }
  }

  return <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
}

export default LoginPage
