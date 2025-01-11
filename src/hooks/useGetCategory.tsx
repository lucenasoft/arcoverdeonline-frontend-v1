import { useState, useEffect } from "react";
import { getAllCategory } from "@/services/category";

interface Category {
  subCategories: any;
  id: string;
  name: string;
}

export const useGetCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data: Category[] = await getAllCategory();
        setCategories(data);
      } catch (error: any) {
        console.error("Erro ao carregar categorias:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;
    setCategoryId(selectedName);
  };

  return {
    categories,
    categoryId,
    setCategoryId,
    handleChange,
    loading,
  };
};