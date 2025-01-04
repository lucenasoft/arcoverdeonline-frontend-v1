const BASE_URL = process.env.URL;

export async function LoginAdmin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/v1/session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Erro no login");
    }

    console.log("Login realizado com sucesso:", res);
    return res.json();
  } catch (error: any) {
    console.error("Erro ao fazer o login:", error.message || error);
    throw new Error(
      error.message ||
        "Não foi possível realizar o login. Verifique suas credenciais."
    );
  }
}
