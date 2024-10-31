// src/UserContext.js
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import BaseURL from '../config/app.config';

const UserContext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getUser = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setIsLoading(false);
      setIsAuthenticated(false);
      setUser(null);
      return;
    }

    try {
      const res = await axios.get(`${BaseURL}/user`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      console.log(token);
      setUser(res.data);
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (err) {
      console.error('Authentication error:', err);
      
      // Handle token expiration or invalid token
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
      }
      
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post(`${BaseURL}/login`, credentials);
      const { token, user: userData } = response.data;
      
      localStorage.setItem('token', token);
      setUser(userData);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Login failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      isLoading,
      isAuthenticated,
      login,
      logout,
      getUser
    }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserContextProvider };