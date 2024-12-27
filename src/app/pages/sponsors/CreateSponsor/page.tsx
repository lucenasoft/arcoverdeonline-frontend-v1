"use client";

// CHAKRA UI
import { Button, Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Alert } from "@/components/ui/alert";

//SERVICES
import { createSponsor } from "@/services/sponsor";

// HOOKS
import { useState } from "react";

export default function CreateSponsor() {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [contact, setContact] = useState("");
  const [url, setUrl] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    const newSponsor = async () => {
      try {
        const res = await createSponsor({
          name,
          logo,
          contact,
          url,
        });

        setSuccess(true);
        return res;
      } catch (error) {
        setError(true);
      }
    };

    newSponsor();
    setName("");
    setLogo("");
    setContact("");
    setUrl("");
  };

  return (
    <div className="flex items-center justify-center flex-col bg-white py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg"
      >
        <Fieldset.Root size="lg" maxW="md">
          <Stack>
            <Fieldset.Legend className="text-2xl font-semibold text-green-700">
              Criar Patrocinador
            </Fieldset.Legend>
            <Fieldset.HelperText className="text-sm text-gray-500">
              Preencha os campos abaixo para criar um novo patrocinador.
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
          <Button
            type="submit"
            marginTop="1rem"
            width="full"
            variant="solid"
            colorScheme="green"
            className="transition-all hover:opacity-80"
            border="1px solid green"
            color="green.700"
          >
            Criar Patrocinador
          </Button>
        </Fieldset.Root>

        <Stack marginTop="1rem">
          {success && (
            <Alert
              status="success"
              title="Patrocinador feito com sucesso!"
            ></Alert>
          )}
          {error && (
            <Alert
              status="error"
              title="Erro ao criar patrocinador, tente novamente mais tarde."
            ></Alert>
          )}
        </Stack>
      </form>
    </div>
  );
}
