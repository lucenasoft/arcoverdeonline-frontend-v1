import { apiRequest } from "@/utils/api";

export async function createPost({
  title,
  pdf,
  subCategoryId,
}: {
  title: string;
  pdf: string;
  subCategoryId: string;
}) {
  try {
    const res = await apiRequest("/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, pdf, subCategoryId }),
    });

    return res;
  } catch (error: any) {
    console.error("Erro ao criar publicação:", error.message);
    throw new Error("Erro ao criar publicação. Tente novamente mais tarde.");
  }
}

export async function getAllPost() {
  try {
    const res = await apiRequest("/post", {
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

export async function getPostId(id: any) {
  if (!id) {
    throw new Error("O ID da publicação é obrigatório.");
  }

  try {
    const res = await apiRequest(`/post/${id}`, {
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

export async function updatePost(
  id: any,
  {
    title,
    pdf,
    subCategoryId,
  }: {
    title: string;
    pdf: string;
    subCategoryId: string;
  }
) {
  if (!id) {
    throw new Error("O ID da publicação é obrigatório.");
  }

  try {
    const res = await apiRequest(`/post/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, pdf, subCategoryId }),
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

export async function deletePost(id: any) {
  if (!id) {
    throw new Error("O ID da publicação é obrigatório.");
  }

  try {
    const res = await apiRequest(`/post/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
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
