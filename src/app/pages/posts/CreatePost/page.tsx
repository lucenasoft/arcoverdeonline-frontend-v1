"use client";

// CHAKRA UI
import { Button, Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Alert } from "@/components/ui/alert";

// SERVICES
import { createPost } from "@/services/post";

// HOOKS
import { useState } from "react";
import { useGetSubCategory } from "@/hooks/useGetSubCategory";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [pdf, setPdf] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const { subCategories, subCategoryId, setSubCategoryId, handleChange } =
    useGetSubCategory();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    const newPost = async () => {
      try {
        const res = await createPost({
          title,
          pdf,
          subCategoryId,
        });

        setSuccess(true);
        return res;
      } catch (error) {
        setError(true);
      }
    };

    newPost();
    setTitle("");
    setPdf("");
    setSubCategoryId("");
  };

  return (
    <div className="flex items-center justify-center flex-col bg-white py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg"
      >
        <Fieldset.Root size="lg" maxW="md">
          <Stack>
            <Fieldset.Legend className="text-2xl font-semibold text-green-700">
              Criar Publicação
            </Fieldset.Legend>
            <Fieldset.HelperText className="text-sm text-gray-500">
              Preencha os campos abaixo para criar uma nova publicação.
            </Fieldset.HelperText>
          </Stack>

          <Fieldset.Content>
            <Field label="Título">
              <Input
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                border="1px solid #ddd"
                placeholder="Insira o título"
                padding="1rem"
                _placeholder={{ color: "gray.400" }}
              />
            </Field>

            <Field label="PDF">
              <Input
                name="pdf"
                type="text"
                value={pdf}
                onChange={(e) => setPdf(e.target.value)}
                required
                border="1px solid #ddd"
                placeholder="Insira o link do PDF"
                padding="1rem"
                _placeholder={{ color: "gray.400" }}
              />
            </Field>

            <label
              className="text-sm font-medium text-gray-700 -mb-4"
              htmlFor="sub-category-select"
            >
              Selecione uma Sub-Categoria
            </label>
            <select
              id="sub-category-select"
              onChange={handleChange}
              value={subCategoryId}
              className="w-full mt-2 p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-700"
            >
              <option value="">
                Escolha uma sub-categoria
              </option>
              {subCategories.map((categ) => (
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
            Criar Publicação
          </Button>
        </Fieldset.Root>

        <Stack marginTop="1rem">
          {success && (
            <Alert
              status="success"
              title="Publicação criada com sucesso!"
            />
          )}
          {error && (
            <Alert
              status="error"
              title="Erro ao criar publicação. Tente novamente."
            />
          )}
        </Stack>
      </form>
    </div>
  );
}
