import { apiRequest } from "@/utils/api";

// Rota que cria o patrocinador
export async function createSponsor({
  name,
  logo,
  contact,
  url
}: {
  name: string;
  logo: string;
  contact: string;
  url: string;
}) {
  try {
    const res = await apiRequest("/sponsors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, logo, contact, url }),
    });
    
    return res;
  } catch (error: any) {
    console.error("Erro ao criar patrocinador:", error.message);
    throw new Error("Erro ao criar patrocinador. Tente novamente mais tarde.");
  }
}

// Rota que mostra todos os patrocinadores
export async function getAllSponsor() {
  try {
    const res = await apiRequest("/sponsors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!Array.isArray(res)) {
      throw new Error("Erro ao listar patrocinadores.");
    }
    
    return res;
  } catch (error: any) {
    console.error("Erro ao listar patrocinadores.", error.message || error);
    throw new Error(
      "Não foi possível listar os patrocinadores. Tente novamente mais tarde."
    );
  }
}

// Rota que mostra o patrocinador selecionado pelo ID
export async function getSponsorId(id: any) {
  if (!id) {
    throw new Error("O ID do patrocinador é obrigatório.");
  }
  
  try {
    const res = await apiRequest(`/sponsors/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    return res;
  } catch (error: any) {
    console.error(
      `Erro ao buscar patrocinador pelo Id ${id}:`,
      error.message || error
    );
    throw new Error(
      `Não foi possível buscar o patrocinador com ID ${id}. Tente novamente mais tarde.`
    );
  }
}

// Rota que faz atualização/edição do patrocinador selecionado pelo ID
export async function updateSponsor(
  id: any,
  {
    name,
    logo,
    contact,
    url
  }: {
    name: string;
    logo: string;
    contact: string;
    url: string;
  }
) {
  if (!id) {
    throw new Error("O ID do patrocinador é obrigatório.");
  }

  try {
    const res = await apiRequest(`/sponsors/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, logo, contact, url }),
    });

    return res;
  } catch (error: any) {
    console.error(
      `Erro ao atualizar o patrocinador com o ID ${id}:`,
      error.message || error
    );
    throw new Error(
      `Não foi possível atualizar o patrocinador com o ID ${id}. Tente novamente mais tarde.`
    );
  }
}

// Rota que deleta o patrocinador selecionado pelo ID
export async function deleteSponsor(id: any) {
  if (!id) {
    throw new Error("O ID do patrocinador é obrigatório.");
  }
  
  try {
    const res = await apiRequest(`/sponsors/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error: any) {
    console.error(
      `Erro ao excluir o patrocinador com o ID ${id}:`,
      error.message || error
    );
    throw new Error(
      `Não foi possível excluir o patrocinador com o ID ${id}. Tente novamente mais tarde.`
    );
  }
}
