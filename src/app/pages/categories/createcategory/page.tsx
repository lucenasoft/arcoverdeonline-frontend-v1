"use client";

// CHAKRA UI
import { Stack } from "@chakra-ui/react";
import { Alert } from "@/components/ui/alert";

// SERVICES
import { createCategory } from "@/services/category";

// HOOKS
import { useEffect, useState } from "react";

// COMPONENTES
import FormCategory from "@/components/Form/FormCategory";
import ButtonFormCreate from "@/components/ButtonCreate/ButtonFormCreate";

export default function CreateCategory() {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [user, setUser] = useState(false);

  useEffect(() => {
    const cookies = document.cookie
      .split("; ")
      .map((cookie) => cookie.split("="));
    const tokenCookie = cookies.find(([key]) => key === "nextauth.token");

    setUser(!!tokenCookie);
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    const newCategory = async () => {
      try {
        const res = await createCategory({
          name,
        });

        setSuccess(true);
        return res;
      } catch (error) {
        setError(true);
      }
    };

    newCategory();
    setName("");
  };

  return (
    <div className={user ? "lg:ml-56 sm:ml-0" : "ml-0"}>
      <div className="flex items-center pt-10 flex-col bg-white h-screen">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg"
        >
          <FormCategory name={name} setName={setName} />

          <ButtonFormCreate />

          <Stack marginTop="1rem">
            {success && (
              <Alert status="success" title="Categoria criada com sucesso!" />
            )}
            {error && <Alert status="error" title="Erro ao criar categoria" />}
          </Stack>
        </form>
      </div>
    </div>
  );
}
