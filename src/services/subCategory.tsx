import { apiRequest } from "@/utils/api";
import Cookies from "js-cookie";

// Rota que cria a sub-categoria
export async function createSubCategory({
  name,
  categoryId,
}: {
  name: string;
  categoryId: string;
}) {
  const token = Cookies.get("nextauth.token");

  try {
    const res = await apiRequest("/subcategories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ name, categoryId, posts: [] }),
    });

    return res;
  } catch (error: any) {
    console.error("Erro ao criar subcategoria:", error.message);
    throw new Error("Erro ao criar subcategoria. Tente novamente mais tarde.");
  }
}


// Rota que mostra todas as sub-categorias
export async function getAllSubCategory() {
  try {
    const res = await apiRequest("/subcategories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!Array.isArray(res)) {
      throw new Error("Erro ao listar sub-categorias.");
    }

    return res;
  } catch (error: any) {
    console.error("Erro ao listar sub-categorias:", error.message || error);
    throw new Error(
      "Não foi possível listar as sub-categorias. Tente novamente mais tarde."
    );
  }
}

// Rota que mostra a sub-categoria selecionada pelo ID
export async function getSubCategoryId(id: any) {
  if (!id) {
    throw new Error("O ID da sub-categoria é obrigatório.");
  }

  try {
    const res = await apiRequest(`/subcategories/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error: any) {
    console.error(
      `Erro ao buscar sub-categoria pelo Id ${id}:`,
      error.message || error
    );
    throw new Error(
      `Não foi possível buscar a sub-categoria com ID ${id}. Tente novamente mais tarde.`
    );
  }
}

// Rota que faz atualização/edição da sub-categoria selecionada pelo ID
export async function updateSubCategory(
  id: any,
  {
    name,
    categoryId,
  }: {
    name: string;
    categoryId: string;
  }
) {
  if (!id) {
    throw new Error("O ID da sub-categoria é obrigatório.");
  }

  const token = Cookies.get("nextauth.token");

  try {
    const res = await apiRequest(`/subcategories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, categoryId }),
    });

    return res;
  } catch (error: any) {
    console.error(
      `Erro ao atualizar a sub-categoria com o ID ${id}:`,
      error.message || error
    );
    throw new Error(
      `Não foi possível atualizar a sub-categoria com o ID ${id}. Tente novamente mais tarde.`
    );
  }
}

// Rota que deleta a sub-categoria selecionada pelo ID
export async function deleteSubCategory(id: any) {
  if (!id) {
    throw new Error("O ID da sub-categoria é obrigatório.");
  }

  const token = Cookies.get("nextauth.token");

  try {
    const response = await apiRequest(`/subcategories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    console.error("Erro ao deletar subcategoria:", error.message);
    throw new Error("Erro ao excluir subcategoria.");
  }
}

