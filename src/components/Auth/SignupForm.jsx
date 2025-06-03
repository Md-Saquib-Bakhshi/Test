import { useState } from "react"
import { Link } from "react-router-dom"
import { validateEmail, validatePassword } from "../../utils/validators"

function SignupForm({ onSubmit, isLoading, error }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email"
    } else if (!formData.email.endsWith("@ust.com")) {
      newErrors.email = "Email must end with @ust.com"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else {
      const passwordValidation = validatePassword(formData.password)
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.message
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData.name, formData.email, formData.password)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full" style={{ maxWidth: "28rem" }}>
        <div className="space-y-8">
          <div>
            <h1 className="text-center text-3xl font-bold text-gray-900">HR Tool</h1>
            <h2 className="mt-6 text-center text-2xl font-semibold text-gray-900">Create your account</h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border text-red-600 px-4 py-3 rounded-md" style={{ borderColor: "#fecaca" }}>
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input-field ${errors.name ? "input-error" : ""}`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-error">{errors.name}</p>}
              </div>

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
                  placeholder="Enter your @ust.com email"
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
                  placeholder="Create a strong password"
                />
                {errors.password && <p className="text-error">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`input-field ${errors.confirmPassword ? "input-error" : ""}`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && <p className="text-error">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div>
              <button type="submit" disabled={isLoading} className="btn-primary w-full">
                {isLoading ? "Creating Account..." : "Sign Up"}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-teal hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignupForm
