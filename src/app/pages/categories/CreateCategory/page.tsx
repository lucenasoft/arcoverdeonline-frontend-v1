"use client";

// CHAKRA UI
import { Button, Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Alert } from "@/components/ui/alert";

// SERVICES
import { createCategory } from "@/services/category";

// HOOKS
import { useState } from "react";

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
        <Fieldset.Root size="lg" maxW="md">
          <Stack>
            <Fieldset.Legend className="text-2xl font-semibold text-green-700">
              Criar Categoria
            </Fieldset.Legend>
            <Fieldset.HelperText className="text-sm text-gray-500">
              Preencha o campo abaixo para criar uma nova categoria.
            </Fieldset.HelperText>
          </Stack>

          <Fieldset.Content>
            <Field label="Nome">
              <Input
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                border="1px solid #ddd"
                placeholder="Insira o nome da categoria"
                padding="1rem"
                _placeholder={{ color: "gray.400" }}
              />
            </Field>
          </Fieldset.Content>

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
        </Fieldset.Root>

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
