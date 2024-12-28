"use client";

// CHAKRA UI
import { Button } from "@chakra-ui/react";

// HOOKS
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// SERVICES
import {
  getSubCategoryId,
  updateSubCategory,
  deleteSubCategory,
} from "@/services/subCategory";
import { useGetCategory } from "@/hooks/useGetCategory";

// COMPONENTES
import FormSubCategory from "@/components/Form/FormSubCategory";
import DialogFormEdit from "@/components/DialogFormEdit/DialogFormEdit";

export default function EditSubCategory() {
  const { id } = useParams();
  const [name, setName] = useState("");

  const [subCategory, setSubCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const { categories, categoryId, setCategoryId, handleChange } =
    useGetCategory();

  useEffect(() => {
    if (!id) return;

    const fetchSubCategoryData = async () => {
      try {
        const data = await getSubCategoryId(id);
        setSubCategory(data);
        setName(data.name);
        setCategoryId(data.categoryId);
      } catch (error: any) {
        setError("Erro ao buscar a sub-categoria, tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategoryData();
  }, [id]);

  const handleEdit = async (e: any) => {
    e.preventDefault();

    try {
      await updateSubCategory(id, { name, categoryId });
      window.location.href = "/pages/subCategories/AllSubCategory";
    } catch (error: any) {
      setError(
        "Erro ao atualizar a sub-categoria, tente novamente mais tarde."
      );
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSubCategory(id);
      window.location.href = "/pages/subCategories/AllSubCategory";
    } catch (error) {
      setError("Erro ao excluir a sub-categoria, tente novamente mais tarde.");
    }
  };

  const handleRedirect = async (e: any) => {
    e.preventDefault();
    window.location.href = "/pages/subCategories/AllSubCategory";
  };

  if (loading) return <p className="flex justify-center pt-8">Carregando...</p>;
  if (error) return <p className="flex justify-center pt-8">{error}</p>;
  if (!subCategory)
    return (
      <p className="flex justify-center pt-8">Sub-categoria não encontrada.</p>
    );

  return (
    <div className="flex items-center justify-center flex-col py-28 bg-white">
      <form className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <FormSubCategory
          handleChange={handleChange}
          name={name}
          setName={setName}
          categoryId={categoryId}
          categories={categories}
        />

        <DialogFormEdit handleEdit={handleEdit} handleDelete={handleDelete} />

        <Button
          size="sm"
          type="submit"
          alignSelf="flex-start"
          width="48%"
          variant="solid"
          color="gray"
          border="1px solid gray"
          marginTop="1rem"
          onClick={handleRedirect}
        >
          Voltar
        </Button>
      </form>
    </div>
  );
}
