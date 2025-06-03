export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  export function validatePassword(password) {
    if (password.length < 8) {
      return { isValid: false, message: "Password must be at least 8 characters long" }
    }
  
    if (!/[A-Z]/.test(password)) {
      return { isValid: false, message: "Password must contain at least one uppercase letter" }
    }
  
    if (!/[a-z]/.test(password)) {
      return { isValid: false, message: "Password must contain at least one lowercase letter" }
    }
  
    if (!/\d/.test(password)) {
      return { isValid: false, message: "Password must contain at least one number" }
    }
  
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return { isValid: false, message: "Password must contain at least one special character" }
    }
  
    return { isValid: true, message: "" }
  }
  