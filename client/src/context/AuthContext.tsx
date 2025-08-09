import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner, Center } from '@chakra-ui/react';

type User = { id: string; email: string } | null;

interface AuthContextType {
  user: User;
  token: string | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const fetchUser = async (authToken: string) => {
    try {
      const res = await axios.get('/auth/me', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setUser(res.data);
    } catch {
      logout();
    }
  };

  const refreshAuthToken = async () => {
    try {
      const res = await axios.post('/auth/refresh', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.token) {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        return res.data.token;
      }
    } catch {
      logout();
    }
    return null;
  };

  // Run once on mount
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        await fetchUser(token);

        // Optional: auto-refresh every 10 mins
        const refreshInterval = setInterval(async () => {
          const newToken = await refreshAuthToken();
          if (newToken) {
            await fetchUser(newToken);
          }
        }, 10 * 60 * 1000);

        return () => clearInterval(refreshInterval);
      }
    };

    initAuth().finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" thickness="4px" color="blue.500" />
      </Center>
    );
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
