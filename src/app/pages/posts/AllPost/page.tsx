"use client";

import { BsPencil } from "react-icons/bs";

import { Button, Table } from "@chakra-ui/react";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getAllPost, deletePost } from "@/services/post";
import DialogFormDelete from "@/components/DialogForm/DialogFormDelete";

import { useGetSubCategory } from "@/hooks/useGetSubCategory";
import ButtonFormCreate from "@/components/ButtonCreate/ButtonFormCreate";
import ButtonPageAllCreate from "@/components/ButtonCreate/ButtonPageAllCreate";

interface Post {
  id: string;
  title: string;
  pdf: string;
  subCategoryId: string;
}

const AllPost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { subCategories } = useGetSubCategory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const postData = await getAllPost();
        setPosts(postData);
      } catch (error: any) {
        console.error("Erro ao carregar dados:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (postId: string) => {
    try {
      await deletePost(postId);
      setPosts((prev) =>
        prev.filter((post) => post.id !== postId)
      );
    } catch (error: any) {
      console.error("Erro ao deletar publicação:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-green-700 text-xl font-semibold">Carregando...</p>
      </div>
    );
  }

  if (!posts) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-green-700 text-xl font-semibold">
          Publicação não encontrada.
        </p>
      </div>
    );
  }

  return (
    <div className="py-20 sm:px-5 lg:h-screen bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-2xl font-bold text-green-700 pb-5">
          Publicações
        </h2>

        <div className="pb-5">
          <ButtonPageAllCreate />
        </div>

        <div>
          <Table.Root size="sm">
            <Table.Header>
              <Table.Row
                backgroundColor="transparent"
                borderBottom="1px solid #ddd"
              >
                <Table.ColumnHeader color="green.700">
                  Nome
                </Table.ColumnHeader>

                <Table.ColumnHeader color="green.700">
                  PDF
                </Table.ColumnHeader>

                <Table.ColumnHeader color="green.700">
                  Sub-Categoria
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {posts.map((post) => (
                <Table.Row
                  key={post.id}
                  backgroundColor="transparent"
                  borderBottom="1px solid #ddd"
                >
                  <Table.Cell color="green.700">{post.title}</Table.Cell>
                  <Table.Cell color="green.700">{post.pdf}</Table.Cell>
                  <Table.Cell color="green.700">
                    {
                      subCategories.find(
                        (subCateg) => subCateg.id === post.subCategoryId
                      )?.name
                    }
                  </Table.Cell>

                  <Table.Cell>
                    <Link
                      href={`/pages/posts/EditPost/${post.id}`}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        border="1px solid green"
                        width="full"
                        color="green"
                      >
                        <span className="hidden sm:block">Editar</span>
                        <BsPencil />
                      </Button>
                    </Link>
                  </Table.Cell>

                  <Table.Cell>
                    <DialogFormDelete
                      handleDelete={() => handleDelete(post.id)}
                    >
                      <span className="hidden sm:block">Apagar</span>
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

export default AllPost;
