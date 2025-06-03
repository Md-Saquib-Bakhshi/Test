import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import DashboardPage from "./pages/DashboardPage"
import ProjectDetailsPage from "./pages/ProjectDetailsPage"
import NotFoundPage from "./pages/NotFoundPage"
import ProtectedRoute from "./components/Common/ProtectedRoute"
import "./index.css"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/project/:id"
              element={
                <ProtectedRoute>
                  <ProjectDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
