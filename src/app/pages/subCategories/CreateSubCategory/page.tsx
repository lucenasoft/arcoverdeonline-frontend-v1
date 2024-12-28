"use client";

// CHAKRA UI
import { Stack } from "@chakra-ui/react";
import { Alert } from "@/components/ui/alert";

//SERVICES
import { createSubCategory } from "@/services/subCategory";

// HOOKS
import { useState } from "react";
import { useGetCategory } from "@/hooks/useGetCategory";

// COMPONENTES
import FormSubCategory from "@/components/Form/FormSubCategory";
import ButtonFormCreate from "@/components/ButtonFormCreate/ButtonFormCreate";

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
        <FormSubCategory
          handleChange={handleChange}
          name={name}
          setName={setName}
          categoryId={categoryId}
          categories={categories}
        />

        <ButtonFormCreate />

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
