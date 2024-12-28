"use client"

// COMPONENTE CHAKRA
import { Button } from "@chakra-ui/react";

// HOOKS
import Link from "next/link";
import { useEffect, useState } from "react";

// SERVICES
import { getAllSubCategory } from "@/services/subCategory";

const AllSubCategory = () => {
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [subCategoryData] = await Promise.all([getAllSubCategory()]);
        setSubCategories(subCategoryData);
      } catch (error: any) {
        console.error("Erro ao carregar dados:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-green-700 text-xl font-semibold">Carregando...</p>
      </div>
    );
  }
  return (
    <div className="py-36 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-2xl font-bold text-green-700 mb-8">
          Sub-Categorias
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          {subCategories.length > 0 &&
            [...subCategories].reverse().map((subCateg) => (
              <li key={subCateg.id}>
                <Link href={`/pages/subCategories/EditSubCategory/${subCateg.id}`}>
                  <Button className="w-full md:w-10/12 bg-green-700 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition">
                    {subCateg.name}
                  </Button>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default AllSubCategory;
