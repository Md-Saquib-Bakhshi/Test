import { useState } from "react"
import { Link } from "react-router-dom"
import { validateEmail } from "../../utils/validators"

function LoginForm({ onSubmit, isLoading, error }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData.email, formData.password)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full" style={{ maxWidth: "28rem" }}>
        <div className="space-y-8">
          <div>
            <h1 className="text-center text-3xl font-bold text-gray-900">HR Tool</h1>
            <h2 className="mt-6 text-center text-2xl font-semibold text-gray-900">Sign in to your account</h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border text-red-600 px-4 py-3 rounded-md" style={{ borderColor: "#fecaca" }}>
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field ${errors.email ? "input-error" : ""}`}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-error">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input-field ${errors.password ? "input-error" : ""}`}
                  placeholder="Enter your password"
                />
                {errors.password && <p className="text-error">{errors.password}</p>}
              </div>
            </div>

            <div>
              <button type="submit" disabled={isLoading} className="btn-primary w-full">
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="font-medium text-teal hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
