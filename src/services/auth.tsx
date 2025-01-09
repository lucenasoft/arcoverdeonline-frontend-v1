import { apiRequest } from "@/utils/api";

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
    console.error(
      "Erro ao obter informações do usuário:",
      error.message || error
    );
    throw error;
  }
}
