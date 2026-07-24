import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { AuthUser } from "@workspace/api-client-react";

const STORAGE_KEY = "misfits_user";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
}

function readStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readStoredUser);

  const login = (u: AuthUser) => {
    setUser(u);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } catch {
      /* ignore storage errors */
    }
  };

  const logout = () => {
    setUser(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore storage errors */
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: user !== null, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
