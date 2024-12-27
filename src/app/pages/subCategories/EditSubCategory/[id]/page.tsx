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
  getSubCategoryId,
  updateSubCategory,
  deleteSubCategory,
} from "@/services/subCategory";
import { useGetCategory } from "@/hooks/useGetCategory";

export default function EditSubCategory() {
  const { id } = useParams();
  const [name, setName] = useState("");

  const [subCategory, setSubCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const { categories, categoryId, setCategoryId, handleChange } =
    useGetCategory();

  useEffect(() => {
    if (!id) return;

    const fetchSubCategoryData = async () => {
      try {
        const data = await getSubCategoryId(id);
        setSubCategory(data);
        setName(data.name);
        setCategoryId(data.subCategoryId);
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
      window.location.href = `/`;
    } catch (error: any) {
      setError(
        "Erro ao atualizar a sub-categoria, tente novamente mais tarde."
      );
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSubCategory(id);
      window.location.href = "/";
    } catch (error) {
      setError("Erro ao excluir a sub-categoria, tente novamente mais tarde.");
    }
  };

  const handleRedirect = async (e: any) => {
    e.preventDefault();
    window.location.href = `/`;
  };

  if (loading) return <p className="flex justify-center pt-8">Carregando...</p>;
  if (error) return <p className="flex justify-center pt-8">{error}</p>;
  if (!subCategory)
    return (
      <p className="flex justify-center pt-8">Sub-categoria não encontrada.</p>
    );

  return (
    <div className="flex items-center justify-center flex-col py-28 bg-white">
      <form className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <Fieldset.Root size="lg" maxW="md">
          <Stack>
            <Fieldset.Legend className="text-2xl font-semibold text-green-700">
              Editar Sub-categoria
            </Fieldset.Legend>
            <Fieldset.HelperText className="text-sm text-gray-500">
              Edite a sua sub-categoria.
            </Fieldset.HelperText>
          </Stack>

          <Fieldset.Content>
            <Field label="Name">
              <Input
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                border="1px solid #ddd"
                placeholder="Insira a sub-categoria"
                padding="1rem"
                _placeholder={{ color: "gray.400" }}
              />
            </Field>

            <label
              className="text-sm font-medium -mb-4"
              htmlFor="category-select"
            >
              Selecione uma categoria
            </label>
            <select
              id="category-select"
              value={categoryId}
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none text-gray-700"
            >
              <option value="">Selecione a categoria</option>
              {categories.map((categ) => (
                <option key={categ.id} value={categ.id}>
                  {categ.name}
                </option>
              ))}
            </select>
          </Fieldset.Content>

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
                    Tem certeza que deseja editar esta sub-categoria?
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
                    Tem certeza que deseja apagar esta sub-categoria?
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
        </Fieldset.Root>
      </form>
    </div>
  );
}
