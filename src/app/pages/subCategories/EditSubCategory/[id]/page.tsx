"use client";

// HOOKS
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// SERVICES
import { getSubCategoryId, updateSubCategory } from "@/services/subCategory";
import { useGetCategory } from "@/hooks/useGetCategory";

// COMPONENTES
import FormSubCategory from "@/components/Form/FormSubCategory";
import DialogFormEdit from "@/components/DialogForm/DialogFormEdit";

export default function EditSubCategory() {
  const { id } = useParams();
  const [name, setName] = useState("");

  const [subCategory, setSubCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const [user, setUser] = useState(false);

  useEffect(() => {
    const cookies = document.cookie
      .split("; ")
      .map((cookie) => cookie.split("="));
    const tokenCookie = cookies.find(([key]) => key === "nextauth.token");

    setUser(!!tokenCookie);
  }, []);

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
      window.location.href = "/pages/subcategories/allsubcategory";
    } catch (error: any) {
      setError(
        "Erro ao atualizar a sub-categoria, tente novamente mais tarde."
      );
    }
  };

  if (loading) return <p className="flex justify-center pt-8">Carregando...</p>;
  if (error) return <p className="flex justify-center pt-8">{error}</p>;
  if (!subCategory)
    return (
      <p className="flex justify-center pt-8">Sub-categoria não encontrada.</p>
    );

  return (
    <div className={user ? "lg:ml-56 sm:ml-0" : "ml-0"}>
      <div className="flex items-center flex-col pt-10 h-screen bg-white">
        <form className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
          <FormSubCategory
            handleChange={handleChange}
            name={name}
            setName={setName}
            categoryId={categoryId}
            categories={categories}
          />

          <DialogFormEdit handleEdit={handleEdit} />
        </form>
      </div>
    </div>
  );
}
