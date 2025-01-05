import { apiRequest } from "@/utils/api";

export async function LoginAdmin({
  email, password,
}: {
  email: string;
  password: string;
}) {
  try {
    const res = await apiRequest("/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Erro no login");
    }
    
    return res;
  } catch (error: any) {
    console.error("Erro ao fazer o login:", error.message || error);
    throw new Error(
      error.message ||
        "Não foi possível realizar o login. Verifique suas credenciais."
    );
  }
}

export async function getUserInfo() {
  try {
    const res = await apiRequest("/session/me", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Não foi possível obter as informações do usuário");
    }

    const userInfo = await res;
    return userInfo;
  } catch (error: any) {
    console.error("Erro ao obter informações do usuário:", error.message || error);
    throw error;
  }
}
