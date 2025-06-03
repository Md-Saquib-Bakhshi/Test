"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { User, LogOut, ChevronDown } from "lucide-react"

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="navbar-logo">USTResumeFormatter</h1>
        </div>

        {/* User Dropdown */}
        <div className="navbar-dropdown">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="navbar-dropdown-button">
            <User size={20} />
            <span>{user?.name}</span>
            <ChevronDown size={16} />
          </button>

          {isDropdownOpen && (
            <div className="navbar-dropdown-menu">
              <button onClick={() => setIsDropdownOpen(false)} className="navbar-dropdown-item">
                <User size={16} />
                Profile
              </button>
              <button onClick={handleLogout} className="navbar-dropdown-item">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for mobile dropdown */}
      {isDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />}
    </nav>
  )
}

export default Navbar
