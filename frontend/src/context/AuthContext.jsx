import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const data = await api.post('/api/auth/login', { email, password });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    };

    const register = async (name, email, password) => {
        try {
            const data = await api.post('/api/auth/register', { name, email, password });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return true;
        } catch (error) {
            console.error("Register failed:", error);
            return false;
        }
    };

    const updateProfile = async (userData) => {
        try {
            const data = await api.put('/api/auth/profile', userData);
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return true;
        } catch (error) {
            console.error("Profile update failed:", error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateProfile, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
