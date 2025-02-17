import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../src/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

interface IAuthContext {
  user: User | null;
  isAuthReady: boolean;
}
const AuthContext = createContext<IAuthContext>({
  user: null,
  isAuthReady: false,
});
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
