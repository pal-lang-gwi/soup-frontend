import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserInfo } from "../api/user/user";
import { UserResponseDto } from "../api/user";

interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  userInfo: UserResponseDto | null;
  login: (userData: UserResponseDto) => void;
  logout: () => void;
  refetchUserInfo: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserResponseDto | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserInfo = async () => {
    try {
      const userData = await getUserInfo();
      setUserInfo(userData);
      setUser(userData.role);
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const refetchUserInfo = async () => {
    await fetchUserInfo();
  };

  useEffect(() => {
    const verifyAuthStatus = async () => {
      // DEV MODE: Comment out this line to bypass auth and enable mock user
      try {
        const userData = await getUserInfo();

        setIsAuthenticated(true);
        setUser(userData.role);
        setUserInfo(userData);
      } catch (error) {
        // DEV MODE: Mock authenticated user for development
        setIsAuthenticated(true);
        setUser('USER');
        setUserInfo({
          userId: 1,
          email: 'dev@example.com',
          nickname: '개발자',
          role: 'USER',
          gender: 'MALE',
          birthDate: '1990-01-01',
          profileImageUrl: 'https://via.placeholder.com/40'
        });
      } finally {
        setLoading(false);
      }
    };

    verifyAuthStatus();
  }, []);

  const login = (userData: UserResponseDto) => {
    setIsAuthenticated(true);
    setUser(userData.role);
    setUserInfo(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setUserInfo(null);
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    userInfo,
    login,
    logout,
    refetchUserInfo,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
