"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminContextType {
  isAuthenticated: boolean;
  adminEmail: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in
    const auth = localStorage.getItem("seetara-admin-auth");
    if (auth) {
      try {
        const { email, token } = JSON.parse(auth);
        if (email && token) {
          setIsAuthenticated(true);
          setAdminEmail(email);
        }
      } catch {
        localStorage.removeItem("seetara-admin-auth");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple authentication (in production, use proper auth)
    const validEmail = "admin@seetara.com";
    const validPassword = "seetara2024";
    
    if (email === validEmail && password === validPassword) {
      const token = btoa(`${email}:${Date.now()}`);
      localStorage.setItem("seetara-admin-auth", JSON.stringify({ email, token }));
      setIsAuthenticated(true);
      setAdminEmail(email);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("seetara-admin-auth");
    setIsAuthenticated(false);
    setAdminEmail(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B5A2B]"></div>
      </div>
    );
  }

  return (
    <AdminContext.Provider value={{ isAuthenticated, adminEmail, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}

