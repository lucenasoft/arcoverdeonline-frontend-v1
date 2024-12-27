const BASE_URL = "http://localhost:3000";

export async function apiRequest(endpoint: string, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);

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
