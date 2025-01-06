"use client";

// HOOKS
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// SERVICES
import { getPostId, updatePost } from "@/services/post";
import { useGetSubCategory } from "@/hooks/useGetSubCategory";

// COMPONENTES
import FormPost from "@/components/Form/FormPost";
import DialogFormEdit from "@/components/DialogForm/DialogFormEdit";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [pdf, setPdf] = useState<File | undefined>(undefined);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { subCategories, subCategoryId, setSubCategoryId, handleChange } =
    useGetSubCategory();

  useEffect(() => {
    if (!id) return;

    const fetchPostData = async () => {
      try {
        const data = await getPostId(id);
        setPost(data);
        setTitle(data.title || "");
        setSubCategoryId(data.subCategoryId || "");
        if (data.pdf) {
          setPdf(undefined);
        }
      } catch (err) {
        setError("Erro ao buscar a publicação. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  const handleEdit = async () => {
    try {
      await updatePost(id, { title, pdf, subCategoryId });
      window.location.href = "/pages/posts/AllPost";
    } catch {
      setError("Erro ao atualizar a publicação. Tente novamente.");
    }
  };

  if (loading) return <p className="flex justify-center pt-8">Carregando...</p>;
  if (error) return <p className="flex justify-center pt-8">{error}</p>;
  if (!post)
    return (
      <p className="flex justify-center pt-8">Publicação não encontrada.</p>
    );

  return (
    <div className="flex items-center flex-col pt-10 h-screen bg-white">
      <form className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <FormPost
          handleChange={handleChange}
          title={title}
          setTitle={setTitle}
          pdf={pdf}
          setPdf={setPdf}
          subCategoryId={subCategoryId}
          subCategories={subCategories}
        />

        <DialogFormEdit handleEdit={handleEdit} />
      </form>
    </div>
  );
}
