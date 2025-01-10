"use client";

// HOOKS
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// SERVICES
import {
  getCategoryId,
  updateCategory,
} from "@/services/category";

// COMPONENTES
import FormCategory from "@/components/Form/FormCategory";
import DialogFormEdit from "@/components/DialogForm/DialogFormEdit";

export default function EditCategory() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCategoryData = async () => {
      try {
        const data = await getCategoryId(id);
        setCategory(data);
        setName(data.name);
      } catch (error: any) {
        setError("Erro ao buscar a categoria, tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [id]);

  const handleEdit = async (e: any) => {
    e.preventDefault();
    try {
      await updateCategory(id, { name });
      window.location.href = "/pages/categories/allcategory";
    } catch (error: any) {
      setError("Erro ao atualizar a categoria, tente novamente mais tarde.");
    }
  };

  if (loading) return <p className="flex justify-center pt-8">Carregando...</p>;
  if (error) return <p className="flex justify-center pt-8">{error}</p>;
  if (!category)
    return (
      <p className="flex justify-center pt-8">Categoria não encontrada.</p>
    );

  return (
    <div className="flex items-center pt-10 flex-col h-screen bg-white">
      <form className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <FormCategory name={name} setName={setName} />

        <DialogFormEdit handleEdit={handleEdit} />
      </form>
    </div>
  );
}
