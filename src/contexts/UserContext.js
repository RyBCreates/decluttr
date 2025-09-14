import { createContext, useContext } from "react";

export const CurrentUserContext = createContext({
  user: null,
  setUser: () => {},
});

export const useCurrentUser = () => useContext(CurrentUserContext);
