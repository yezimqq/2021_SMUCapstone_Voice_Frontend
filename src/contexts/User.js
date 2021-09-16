import React, { useState, createContext } from 'react';

const UserContext = createContext({
  user: { LoginId: null, password: null },
  dispatch: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const dispatch = ({ LoginId, password }) => {
    setUser({ LoginId, password });
  };
  const value = { user, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
