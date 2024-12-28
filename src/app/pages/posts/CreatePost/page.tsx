"use client";

// CHAKRA UI
import { Stack } from "@chakra-ui/react";
import { Alert } from "@/components/ui/alert";

// SERVICES
import { createPost } from "@/services/post";

// HOOKS
import { useState } from "react";
import { useGetSubCategory } from "@/hooks/useGetSubCategory";

// COMPONENTES
import FormPost from "@/components/Form/FormPost";
import ButtonFormCreate from "@/components/ButtonFormCreate/ButtonFormCreate";

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
        <FormPost
          handleChange={handleChange}
          title={title}
          setTitle={setTitle}
          pdf={pdf}
          setPdf={setPdf}
          subCategoryId={subCategoryId}
          subCategories={subCategories}
        />

        <ButtonFormCreate />

        <Stack marginTop="1rem">
          {success && (
            <Alert status="success" title="Publicação criada com sucesso!" />
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
