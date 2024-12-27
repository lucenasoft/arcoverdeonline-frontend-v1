import { useState, useEffect } from "react";
import { getAllSubCategory } from "@/services/subCategory";

interface SubCategory {
  id: string;
  name: string;
}

export const useGetSubCategory = () => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [subCategoryId, setSubCategoryId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const data: SubCategory[] = await getAllSubCategory();
        setSubCategories(data);
      } catch (error: any) {
        console.error("Erro ao carregar sub-categorias:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;
    setSubCategoryId(selectedName);
  };

  return {
    subCategories,
    subCategoryId,
    setSubCategoryId,
    handleChange,
    loading,
  };
};