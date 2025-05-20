import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  userId?: string;
  isAnonymous: boolean;
  joinedYear?: number;
  regDate?: string;
  gender?: string;
  setUser: (userId: string) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [isAnonymous, setIsAnonymous] = useState(true);

  const setUser = (id: string) => {
    setUserId(id);
    setIsAnonymous(false);
  };

  const clearUser = () => {
    setUserId(undefined);
    setIsAnonymous(true);
  };

  return (
    <UserContext.Provider value={{ userId, isAnonymous, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserProvider가 최상단에 설정되어 있지 않습니다.");
  }
  return context;
};
