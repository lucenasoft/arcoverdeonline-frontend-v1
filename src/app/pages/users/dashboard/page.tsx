"use client";

import { useEffect, useState } from "react";
import { getUserInfo } from "@/services/auth";

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(false);

  useEffect(() => {
    const cookies = document.cookie
      .split("; ")
      .map((cookie) => cookie.split("="));
    const tokenCookie = cookies.find(([key]) => key === "nextauth.token");

    setUser(!!tokenCookie);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await getUserInfo();
        setUserInfo(res);
      } catch (error) {
        console.error("Erro ao carregar informações do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!user) {
    return <p>Erro ao carregar informações do usuário</p>;
  }

  return (
    <div className={user ? "lg:ml-56 sm:ml-0" : "ml-0"}>
      <h1>Bem-vindo, {userInfo}!</h1>
    </div>
  );
}
