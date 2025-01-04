const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// funcao que faz o fetch das rotas
export async function apiRequest(endpoint: string, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  
  console.log(BASE_URL)
  if (!res.ok) {
    let errorMessage = "Erro desconhecido";

    try {
      const errorData = await res.json();
      errorMessage = errorData.message || JSON.stringify(errorData);
    } catch (err) {
      errorMessage = await res.text();
    }

    throw new Error(`Erro na API: ${res.status} - ${errorMessage}`);
  }

  return res.json();
}
