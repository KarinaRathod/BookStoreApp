import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Check localStorage for an existing user session
    const initialAuthUser = localStorage.getItem("Users");
    const [authUser, setAuthUser] = useState(
        initialAuthUser ? JSON.parse(initialAuthUser) : null
    );

    const login = (userData) => {
        // In a real app, you'd get this data from your login API
        const user = { _id: userData._id, fullName: userData.fullName, email: userData.email };
        localStorage.setItem("Users", JSON.stringify(user));
        setAuthUser(user);
        toast.success("Login successful!");
    };
    
    const logout = () => {
        localStorage.removeItem("Users");
        setAuthUser(null);
        toast.success("Logout successful!");
    };

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);