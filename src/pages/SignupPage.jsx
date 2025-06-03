import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import SignupForm from "../components/Auth/SignupForm"

function SignupPage() {
  const [error, setError] = useState("")
  const { signup, user, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }
  }, [user, navigate])

  const handleSignup = async (name, email, password) => {
    setError("")
    try {
      const success = await signup(name, email, password)
      if (success) {
        navigate("/dashboard")
      } else {
        setError("Failed to create account. Please try again.")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    }
  }

  return <SignupForm onSubmit={handleSignup} isLoading={isLoading} error={error} />
}

export default SignupPage
