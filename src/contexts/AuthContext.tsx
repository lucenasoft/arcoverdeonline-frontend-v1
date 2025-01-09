"use client";

import { createContext, useState } from "react";
import { apiRequest } from "@/utils/api";
import { setCookie } from "nookies";

interface AuthContextProps {
  isAuthenticated: boolean;
  LoginAdmin: (data: { email: string; password: string }) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function LoginAdmin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const { token } = await apiRequest("/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      setCookie(undefined, "nextauth.token", token, { maxAge: 60 * 60 * 1, path: "/" });
      setIsAuthenticated(true);
      window.location.href = "/";
    } catch (error: any) {
      console.error("Erro ao fazer login:", error.message);
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, LoginAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}
