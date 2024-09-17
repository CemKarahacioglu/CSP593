// Definition of types
export interface SignUpValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

// Function to validate first and last name (just checks if it's not empty)
const validateName = (name: string): string | null => {
  if (!name) {
    return "This field is required.";
  }
  return null;
};

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

// Function to validate password (basic rule: at least 6 characters)
const validatePassword = (password: string): string | null => {
  if (!password) {
    return "Password is required.";
  } else if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }
  return null;
};

// Main validation function for sign-up
export const validateSignUpForm = (values: SignUpValues): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Validate first name
  const firstNameError = validateName(values.firstName);
  if (firstNameError) {
    errors.firstName = firstNameError;
  }

  // Validate last name
  const lastNameError = validateName(values.lastName);
  if (lastNameError) {
    errors.lastName = lastNameError;
  }

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
