import { Link } from "react-router-dom"
import { Home } from "lucide-react"

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/dashboard" className="btn-primary flex items-center space-x-2 mx-auto">
          <Home size={20} />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
