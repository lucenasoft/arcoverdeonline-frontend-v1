"use client"

import { useEffect, useState } from "react";
import { getUserInfo } from "@/services/auth";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await getUserInfo();
        setUser(res);
      } catch (error) {
        console.error("Erro ao carregar informações do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!user) {
    return <p>Erro ao carregar informações do usuário</p>;
  }

  return (
    <div>
      <h1>Bem-vindo, {user}!</h1>
    </div>
  );
}
