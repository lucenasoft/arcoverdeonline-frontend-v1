import { apiRequest } from "@/utils/api";

// Rota que mostra o usuario selecionada pelo ID
export async function getUserId(id: any) {
  if (!id) {
    throw new Error("O ID do usuário é obrigatório.");
  }

  try {
    const res = await apiRequest(`/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error: any) {
    console.error(
      `Erro ao buscar usuário pelo Id ${id}:`,
      error.message || error
    );
    throw new Error(
      `Não foi possível buscar o usuário com ID ${id}. Tente novamente mais tarde.`
    );
  }
}

// Rota que faz atualização/edição do usuário selecionada pelo ID
export async function updateUser(
  id: any,
  {
    name,
    email,
    password
  }: {
    name: string;
    email: string;
    password: string;
  }
) {
  if (!id) {
    throw new Error("O ID do usuário é obrigatório.");
  }

  try {
    const res = await apiRequest(`/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    return res;
  } catch (error: any) {
    console.error(
      `Erro ao atualizar o usuário com o ID ${id}:`,
      error.message || error
    );
    throw new Error(
      `Não foi possível atualizar o usuário com o ID ${id}. Tente novamente mais tarde.`
    );
  }
}
