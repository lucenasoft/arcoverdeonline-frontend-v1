"use client";

// CHAKRA UI
import { Button } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogRoot,
  DialogTrigger,
} from "@/components/ui/dialog";

// HOOKS
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// SERVICES
import { getPostId, updatePost, deletePost } from "@/services/post";
import { useGetSubCategory } from "@/hooks/useGetSubCategory";
import FormPost from "@/components/Form/FormPost";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [pdf, setPdf] = useState("");

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
        setTitle(data.title);
        setPdf(data.pdf);
        setSubCategoryId(data.subCategoryId);
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
      window.location.href = `/`;
    } catch {
      setError("Erro ao atualizar a publicação. Tente novamente.");
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(id);
      window.location.href = "/";
    } catch {
      setError("Erro ao excluir a publicação. Tente novamente.");
    }
  };

  const handleRedirect = async (e: any) => {
    e.preventDefault();
    window.location.href = `/`;
  };

  if (loading) return <p className="flex justify-center pt-8">Carregando...</p>;
  if (error) return <p className="flex justify-center pt-8">{error}</p>;
  if (!post)
    return (
      <p className="flex justify-center pt-8">Publicação não encontrada.</p>
    );

  return (
    <div className="flex items-center justify-center flex-col py-16 bg-white">
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

        <div className="flex justify-between gap-4 mt-4">
          <DialogRoot role="alertdialog" placement="center">
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                border="1px solid green"
                width="48%"
                color="green"
              >
                Editar
              </Button>
            </DialogTrigger>
            <DialogContent backgroundColor="white">
              <DialogHeader>
                <DialogTitle>
                  Tem certeza que deseja editar esta publicação?
                </DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogActionTrigger>
                <Button color="green" onClick={handleEdit}>
                  Editar
                </Button>
              </DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>

          <DialogRoot role="alertdialog" placement="center">
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                border="1px solid red"
                width="48%"
                color="red"
              >
                Apagar
              </Button>
            </DialogTrigger>
            <DialogContent backgroundColor="white">
              <DialogHeader>
                <DialogTitle>
                  Tem certeza que deseja apagar esta publicação?
                </DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogActionTrigger>
                <Button color="red" onClick={handleDelete}>
                  Apagar
                </Button>
              </DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>
        </div>
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
