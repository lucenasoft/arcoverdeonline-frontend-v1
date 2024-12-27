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
import { deleteSponsor, getSponsorId, updateSponsor } from "@/services/sponsor";

export default function EditSponsor() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [contact, setContact] = useState("");
  const [url, setUrl] = useState("");

  const [sponsor, setSponsor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const fetchSponsorData = async () => {
      try {
        const data = await getSponsorId(id);
        setSponsor(data);
        setName(data.name);
        setLogo(data.logo);
        setContact(data.contact);
        setUrl(data.url);
      } catch (error: any) {
        setError("Erro ao buscar o patrocinador, tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchSponsorData();
  }, [id]);

  const handleEdit = async (e: any) => {
    e.preventDefault();

    try {
      await updateSponsor(id, { name, logo, contact, url });
      window.location.href = `/`;
    } catch (error: any) {
      setError("Erro ao atualizar o patrocinador, tente novamente mais tarde.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSponsor(id);
      window.location.href = "/";
    } catch (error) {
      setError("Erro ao excluir o patrocinador, tente novamente mais tarde.");
    }
  };

  const handleRedirect = async (e: any) => {
    e.preventDefault();
    window.location.href = `/`;
  };

  if (loading) return <p className="flex justify-center pt-8">Carregando...</p>;
  if (error) return <p className="flex justify-center pt-8">{error}</p>;
  if (!sponsor)
    return (
      <p className="flex justify-center pt-8">Patrocinador não encontrado.</p>
    );

  return (
    <div className="flex items-center justify-center flex-col py-6 bg-white">
      <form className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <Fieldset.Root size="lg" maxW="md">
          <Stack>
            <Fieldset.Legend className="text-2xl font-semibold text-green-700">
              Editar patrocinador
            </Fieldset.Legend>
            <Fieldset.HelperText className="text-sm text-gray-500">
              Edite o patrocinador.
            </Fieldset.HelperText>
          </Stack>

          <Fieldset.Content>
            <Field label="Nome">
              <Input
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                border="1px solid #ddd"
                placeholder="Insira o nome do patrocinador"
                padding="1rem"
                _placeholder={{ color: "gray.400" }}
              />
            </Field>

            <Field label="Logo">
              <Input
                name="logo"
                type="text"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                required
                border="1px solid #ddd"
                placeholder="Insira a logo do patrocinador"
                padding="1rem"
                _placeholder={{ color: "gray.400" }}
              />
            </Field>

            <Field label="Contato">
              <Input
                name="contact"
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                border="1px solid #ddd"
                placeholder="Insira o contato do patrocinador"
                padding="1rem"
                _placeholder={{ color: "gray.400" }}
              />
            </Field>

            <Field label="URL">
              <Input
                name="url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                border="1px solid #ddd"
                placeholder="Insira a URL do patrocinador"
                padding="1rem"
                _placeholder={{ color: "gray.400" }}
              />
            </Field>
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
                    Tem certeza que deseja editar este patrocinador?
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
                    Tem certeza que deseja apagar este patrocinador?
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
