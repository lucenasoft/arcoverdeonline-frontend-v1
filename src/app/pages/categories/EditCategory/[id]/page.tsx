"use client";

// CHAKRA UI
import { Button, Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import {
  DialogActionTrigger,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// HOOKS
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// SERVICES
import {
  deleteCategory,
  getCategoryId,
  updateCategory,
} from "@/services/category";
import FormCategory from "@/components/Form/FormCategory";

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
      window.location.href = `/`;
    } catch (error: any) {
      setError("Erro ao atualizar a categoria, tente novamente mais tarde.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCategory(id);
      window.location.href = "/";
    } catch (error) {
      setError("Erro ao excluir a categoria, tente novamente mais tarde.");
    }
  };

  const handleRedirect = async (e: any) => {
    e.preventDefault();
    window.location.href = `/`;
  };

  if (loading) return <p className="flex justify-center pt-8">Carregando...</p>;
  if (error) return <p className="flex justify-center pt-8">{error}</p>;
  if (!category)
    return (
      <p className="flex justify-center pt-8">Categoria não encontrada.</p>
    );

  return (
    <div className="flex items-center justify-center flex-col py-36 bg-white">
      <form className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <FormCategory name={name} setName={setName} />

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
                  Tem certeza que deseja editar esta categoria?
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
                  Tem certeza que deseja apagar esta categoria?
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
