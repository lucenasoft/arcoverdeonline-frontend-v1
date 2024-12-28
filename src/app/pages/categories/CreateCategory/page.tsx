"use client";

// CHAKRA UI
import { Button, Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Alert } from "@/components/ui/alert";

// SERVICES
import { createCategory } from "@/services/category";

// HOOKS
import { useState } from "react";
import FormCategory from "@/components/Form/FormCategory";

export default function CreateCategory() {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

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
    <div className="flex items-center justify-center flex-col bg-white py-40">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg"
      >
        <FormCategory name={name} setName={setName} />

        <Button
          type="submit"
          marginTop="1rem"
          width="full"
          variant="solid"
          colorScheme="green"
          className="transition-all hover:opacity-80"
          border="1px solid green"
          color="green.700"
        >
          Criar Categoria
        </Button>

        <Stack marginTop="1rem">
          {success && (
            <Alert status="success" title="Categoria criada com sucesso!" />
          )}
          {error && <Alert status="error" title="Erro ao criar categoria" />}
        </Stack>
      </form>
    </div>
  );
}
