import React, { useState, createContext } from 'react';

const UserContext = createContext({
<<<<<<< HEAD
  user: { uid: null },
  setUser: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUserInfo] = useState({});
  const setUser = ({ uid }) => {
    setUserInfo({ uid });
  };
  const value = { user, setUser };
=======
  user: { LoginId: null, password: null },
  dispatch: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const dispatch = ({ LoginId, password }) => {
    setUser({ LoginId, password });
  };
  const value = { user, dispatch };
>>>>>>> master
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };