"use client";

// CHAKRA UI
import { Button, Stack } from "@chakra-ui/react";
import { Alert } from "@/components/ui/alert";

//SERVICES
import { createSponsor } from "@/services/sponsor";

// HOOKS
import { useState } from "react";

// COMPONENTES
import FormSponsor from "@/components/Form/FormSponsor";

export default function CreateSponsor() {
  const [name, setName] = useState<string>("");
  const [logo, setLogo] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [url, setUrl] = useState<string>("");

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
        <FormSponsor
          name={name}
          setName={setName}
          logo={logo}
          setLogo={setLogo}
          contact={contact}
          setContact={setContact}
          url={url}
          setUrl={setUrl}
        />

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
          Criar patrocinador
        </Button>

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
