import React, { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  /**
   * User Id's convention:
   * 0: Not logged in
   * 1: Landlord
   * 2: Tenant 1
   * 3: Tenant 2
   */
  const [userId, setUserId] = useState(0);

  return (
    <AuthContext.Provider value={{ userId }}>{children}</AuthContext.Provider>
  );
};
