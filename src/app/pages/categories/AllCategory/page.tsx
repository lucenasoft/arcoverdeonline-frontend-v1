"use client";

import { BsPencil } from "react-icons/bs";

import { Button, Table } from "@chakra-ui/react";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getAllCategory, deleteCategory } from "@/services/category";
import DialogFormDelete from "@/components/DialogForm/DialogFormDelete";

interface Category {
  id: string;
  name: string;
}

const AllCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const categoryData = await getAllCategory();
        setCategories(categoryData);
      } catch (error: any) {
        console.error("Erro ao carregar dados:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (categoryId: string) => {
    try {
      await deleteCategory(categoryId);
      setCategories((prev) => prev.filter((categ) => categ.id !== categoryId));
    } catch (error: any) {
      console.error("Erro ao deletar categoria:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-green-700 text-xl font-semibold">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center pb-8 text-2xl font-bold text-green-700 mb-8">
          Categorias
        </h2>

        <div className="md:px-10">
          <Table.Root size="lg">
            <Table.Body>
              {categories.map((categ) => (
                <Table.Row
                  key={categ.id}
                  backgroundColor="transparent"
                  borderBottom="1px solid #ddd"
                >
                  <Table.Cell color="green.700" fontSize="1.2rem">
                    {categ.name}
                  </Table.Cell>

                  <Table.Cell textAlign="right">
                    <Link href={`/pages/categories/EditCategory/${categ.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        border="1px solid green"
                        width="full"
                        color="green"
                      >
                        Editar
                        <BsPencil />
                      </Button>
                    </Link>
                  </Table.Cell>

                  <Table.Cell>
                    <DialogFormDelete
                      handleDelete={() => handleDelete(categ.id)}
                    >
                      Apagar
                    </DialogFormDelete>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>
      </div>
    </div>
  );
};

export default AllCategory;
