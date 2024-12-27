import { apiRequest } from "@/utils/api";

// Rota que cria o usuário
export async function createUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const res = await apiRequest("/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    
    return res;
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error.message);
    throw new Error("Erro ao criar usuário. Tente novamente mais tarde.");
  }
}

// Rota que mostra todas os usuários
export async function getAllUser() {
  try {
    const res = await apiRequest("/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!Array.isArray(res)) {
      throw new Error("Erro ao listar usuários.");
    }
    
    return res;
  } catch (error: any) {
    console.error("Erro ao listar usuários:", error.message || error);
    throw new Error(
      "Não foi possível listar os usuários. Tente novamente mais tarde."
    );
  }
}

// Rota que mostra o usuário selecionado pelo ID
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

// Rota que faz atualização/edição do usuário selecionado pelo ID
export async function updateUser(
  id: any,
  {
    name,
    email,
    password,
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
      `Erro ao atualizar a usuário com o ID ${id}:`,
      error.message || error
    );
    throw new Error(
      `Não foi possível atualizar a usuário com o ID ${id}. Tente novamente mais tarde.`
    );
  }
}

// Rota que deleta ao usuário selecionado pelo ID
export async function deleteUser(id: any) {
  if (!id) {
    throw new Error("O ID do usuário é obrigatório.");
  }

  try {
    const res = await apiRequest(`/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error: any) {
    console.error(
      `Erro ao excluir a usuário com o ID ${id}:`,
      error.message || error
    );
    throw new Error(
      `Não foi possível excluir a usuário com o ID ${id}. Tente novamente mais tarde.`
    );
  }
}
