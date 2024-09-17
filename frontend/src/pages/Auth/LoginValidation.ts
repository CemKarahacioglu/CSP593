export interface LoginValues {
  email: string;
  password: string;
}

export interface ValidationErrors {
  email?: string;
  password?: string;
}

// Function to validate email format
const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex pattern
  if (!email) {
    return "Email is required.";
  } else if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }
  return null;
};

// Function to validate password
const validatePassword = (password: string): string | null => {
  if (!password) {
    return "Password is required.";
  } else if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }
  return null;
};

// Main validation function
export const validateLoginForm = (values: LoginValues): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Validate email
  const emailError = validateEmail(values.email);
  if (emailError) {
    errors.email = emailError;
  }

  // Validate password
  const passwordError = validatePassword(values.password);
  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
};
