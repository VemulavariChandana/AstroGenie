import { createContext, useContext, useState, useEffect } from "react";
import { apiRequest } from "./queryClient";

interface User {
  id: number;
  username: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<User>;
  register: (username: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await apiRequest("/api/auth/user");
        setUser(response);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<User> => {
    const userData = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const user = userData as User;
    setUser(user);
    return user;
  };

  const register = async (username: string, password: string): Promise<User> => {
    const userData = await apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const user = userData as User;
    setUser(user);
    return user;
  };

  const logout = async (): Promise<void> => {
    await apiRequest('/api/auth/logout', {
      method: 'POST'
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}