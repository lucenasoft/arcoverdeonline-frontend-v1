"use client";

// CHAKRA UI
import { Button, Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Alert } from "@/components/ui/alert";

//SERVICES
import { createSubCategory } from "@/services/subCategory";

// HOOKS
import { useState } from "react";
import { useGetCategory } from "@/hooks/useGetCategory";

export default function CreateSubCategory() {
  const [name, setName] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const { categories, categoryId, setCategoryId, handleChange } =
    useGetCategory();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    const newSubCategory = async () => {
      try {
        const res = await createSubCategory({
          name,
          categoryId,
        });

        setSuccess(true);
        return res;
      } catch (error) {
        setError(true);
      }
    };

    newSubCategory();
    setName("");
    setCategoryId("");
  };

  return (
    <div className="flex items-center justify-center flex-col bg-white py-28">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg"
      >
        <Fieldset.Root size="lg" maxW="md">
          <Stack>
            <Fieldset.Legend className="text-2xl font-semibold text-green-700">
              Criar Sub-Categoria
            </Fieldset.Legend>
            <Fieldset.HelperText className="text-sm text-gray-500">
              Preencha os campos abaixo para criar uma nova sub-categoria.
            </Fieldset.HelperText>
          </Stack>

          <Fieldset.Content>
            <Field label="Nome">
              <Input
                name="namr"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                border="1px solid #ddd"
                placeholder="Insira a sub-categoria"
                padding="1rem"
                _placeholder={{ color: "gray.400" }}
              />
            </Field>

            <label
              className="text-sm font-medium text-gray-700 -mb-4"
              htmlFor="category-select"
            >
              Selecione uma categoria
            </label>
            <select
              id="category-select"
              onChange={handleChange}
              value={categoryId}
              className="w-full mt-2 p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-700"
            >
              <option value="">
                Selecione a categoria
              </option>
              {categories.map((categ) => (
                <option key={categ.id} value={categ.id}>
                  {categ.name}
                </option>
              ))}
            </select>
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
            Criar Sub-Categoria
          </Button>
        </Fieldset.Root>

        <Stack marginTop="1rem">
          {success && (
            <Alert
              status="success"
              title="Sub-categoria feita com sucesso!"
            ></Alert>
          )}
          {error && (
            <Alert
              status="error"
              title="Erro ao criar sub-categoria, tente novamente mais tarde."
            ></Alert>
          )}
        </Stack>
      </form>
    </div>
  );
}
