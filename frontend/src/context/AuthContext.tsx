// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

// The shape of user data
interface User {
  name: string;
  email: string; // Add email to track
}

// Context type
interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// The context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData); // Set the user data when logged in
    localStorage.setItem("user", JSON.stringify(userData)); // Optionally, store the user data in localStorage
  };

  const logout = () => {
    setUser(null); // Clear the user data on logout
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
