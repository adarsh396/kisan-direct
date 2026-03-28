import { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

// Create a Provider component that wraps our app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // When the app loads, check if the user is already logged in (saved in local storage)
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  // Logout function to clear data
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};