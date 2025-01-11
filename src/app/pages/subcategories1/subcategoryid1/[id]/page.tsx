"use client";

// CHAKRA UI
import { Button } from "@chakra-ui/react";

// HOOKS
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// SERVICES
import { getSubCategoryId } from "@/services/subCategory";
import { getAllPost } from "@/services/post";

export default function SubCategoryDetails() {
  interface Post {
    id: string;
    title: string;
    pdf: string;
    subCategoryId: string;
  }

  const { id } = useParams();
  const [subCategory, setSubCategory] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [user, setUser] = useState(false);

  useEffect(() => {
    const cookies = document.cookie
      .split("; ")
      .map((cookie) => cookie.split("="));
    const tokenCookie = cookies.find(([key]) => key === "nextauth.token");

    setUser(!!tokenCookie);
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchPostAndSubCategories = async () => {
      try {
        setLoading(true);

        const subCategoryData = await getSubCategoryId(id);

        if (!subCategoryData) {
          setError("Sub-categoria não encontrada.");
          return;
        }

        const allPosts = await getAllPost();

        const filteredPosts = allPosts.filter(
          (sub) => sub.subCategoryId === id
        );

        setSubCategory(subCategoryData);
        setPosts(filteredPosts);
      } catch (err: any) {
        setError("Erro ao carregar os dados. Tente novamente mais tarde.");
        console.error(
          "Erro ao buscar as publicações ou subcategorias:",
          err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndSubCategories();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-green-700 text-xl font-semibold">Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-xl font-semibold">{error}</p>
      </div>
    );
  }

  if (!subCategory) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-xl font-semibold">
          Sub-categoria não encontrada.
        </p>
      </div>
    );
  }

  return (
    <div className={user ? "lg:ml-56 sm:ml-0" : "ml-0"}>
      <div className="px-4 bg-white pt-10 h-screen">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-green-700 pb-6">
            {subCategory.name}
          </h1>

          <h2 className="py-4 text-2xl font-semibold text-green-700">
            Publicações:
          </h2>
          {posts.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <li key={post.id}>
                  <Link href={``}>
                    <Button
                      borderBottom="1px solid green"
                      padding="1rem"
                      width="full"
                      className="w-full bg-white text-green-700 font-semibold rounded-none shadow-lg hover:bg-green-700 hover:text-white transition hover:rounded-md"
                    >
                      {post.title}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Nenhuma publicação encontrada.</p>
          )}

          <Link href={`/`}>
            <Button
              backgroundColor="green.700"
              padding="1rem"
              width="4/12"
              className="mt-6 hover:bg-green-500 transition-colors"
              color="white"
            >
              Voltar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
