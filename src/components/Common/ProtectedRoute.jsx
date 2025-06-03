import { Navigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2" style={{ borderColor: "#006b64" }}></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
