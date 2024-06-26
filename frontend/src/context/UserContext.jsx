import { createContext } from "react";
import useAuth from "../hooks/useAuth";

const UserContext = createContext();

function UserProvider({ children }) {
  const { register } = useAuth();

  return (
    <UserContext.Provider value={{ register }}>{children}</UserContext.Provider>
  );
}

export { UserContext, UserProvider };
