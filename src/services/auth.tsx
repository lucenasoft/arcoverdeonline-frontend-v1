import { apiRequest } from "../utils/api";

export async function LoginAdmin({
  email,
  password,
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

    console.log("Login realizado com sucesso:", res);
    return res;
  } catch (error: any) {
    console.error("Erro ao fazer o login:", error.message || error);
    throw new Error(
      "Não foi possível realizar o login. Verifique suas credenciais."
    );
  }
}

export async function LogoutAdmin(token: string) {
  if (!token) {
    throw new Error("O token é obrigatório para fazer o logout.");
  }

  try {
    const res = await apiRequest("/session", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Logout realizado com sucesso:", res);
    return res;
  } catch (error: any) {
    console.error("Erro ao fazer o logout:", error.message || error);
    throw new Error(
      "Não foi possível realizar o logout. Tente novamente mais tarde."
    );
  }
}
