import { apiRequestForm } from "@/utils/api";
import { apiRequest } from "@/utils/api";
import Cookies from "js-cookie";

// Rota que cria a publicação
export async function createPost(formData: FormData) {
  const token = Cookies.get("nextauth.token");

  try {
    const res = await apiRequestForm("/posts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });

    return res.json();
  } catch (error: any) {
    console.error("Erro ao criar publicação:", error.message || error);
    throw new Error("Erro ao criar publicação. Tente novamente mais tarde.");
  }
}


// Rota que mostra todas as publicações
export async function getAllPost() {
  try {
    const res = await apiRequest("/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!Array.isArray(res)) {
      throw new Error("Erro ao listar publicações.");
    }

    return res;
  } catch (error: any) {
    console.error("Erro ao listar publicações:", error.message || error);
    throw new Error(
      "Não foi possível listar as publicações. Tente novamente mais tarde."
    );
  }
}

// Rota que mostra a publicação selecionada pelo ID
export async function getPostId(id: any) {
  if (!id) {
    throw new Error("O ID da publicação é obrigatório.");
  }

  try {
    const res = await apiRequest(`/posts/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error: any) {
    console.error(
      `Erro ao buscar publicação pelo Id ${id}:`,
      error.message || error
    );
    throw new Error(
      `Não foi possível buscar a publicação com ID ${id}. Tente novamente mais tarde.`
    );
  }
}

// Rota que faz atualização/edição da publicação selecionada pelo ID
export async function updatePost(
  id: any,
  {
    title,
    pdf,
    subCategoryId,
  }: {
    title: string;
    pdf?: File | null;
    subCategoryId: string;
  }
) {
  if (!id) {
    throw new Error("O ID da publicação é obrigatório.");
  }

  const token = Cookies.get("nextauth.token");

  try {
    const formData = new FormData();
    formData.append("title", title);
    if (pdf) {
      formData.append("pdf", pdf);
    }
    formData.append("subCategoryId", subCategoryId);

    const res = await apiRequestForm("/posts${id}", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return res;
  } catch (error: any) {
    console.error(
      `Erro ao atualizar a publicação com o ID ${id}:`,
      error.message || error
    );
    throw new Error(
      `Não foi possível atualizar a publicação com o ID ${id}. Tente novamente mais tarde.`
    );
  }
}

// Rota que deleta a publicação selecionada pelo ID
export async function deletePost(id: any) {
  if (!id) {
    throw new Error("O ID da publicação é obrigatório.");
  }

  const token = Cookies.get("nextauth.token");

  try {
    const res = await apiRequest(`/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error: any) {
    console.error(
      `Erro ao excluir a publicação com o ID ${id}:`,
      error.message || error
    );
    throw new Error(
      `Não foi possível excluir a publicação com o ID ${id}. Tente novamente mais tarde.`
    );
  }
}
