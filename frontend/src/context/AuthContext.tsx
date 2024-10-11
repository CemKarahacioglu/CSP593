import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

// The shape of user data
interface User {
  id: number;
  name: string;
  email: string;
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

  // Restore user data from localStorage when the app initializes
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set the user from localStorage if found
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Function to handle login
  const login = (userData: User) => {
    console.log("Storing user data:", userData);
    setUser(userData); // Set the user data when logged in
    localStorage.setItem("user", JSON.stringify(userData)); //store the user data in localStorage
  };

  // Function to handle logout
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
