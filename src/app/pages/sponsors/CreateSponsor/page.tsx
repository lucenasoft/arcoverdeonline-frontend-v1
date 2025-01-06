"use client";

// CHAKRA UI
import { Stack } from "@chakra-ui/react";
import { Alert } from "@/components/ui/alert";

// SERVICES
import { createSponsor } from "@/services/sponsor";

// HOOKS
import { useState } from "react";

// COMPONENTES
import FormSponsor from "@/components/Form/FormSponsor";
import ButtonFormCreate from "@/components/ButtonCreate/ButtonFormCreate";

export default function CreateSponsor() {
  const [name, setName] = useState<string>("");
  const [logo, setLogo] = useState<File | null>(null);
  const [contact, setContact] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    try {
      await createSponsor({
        name,
        logo: logo!,
        contact,
        url,
      });

      setSuccess(true);

      setName("");
      setLogo(null);
      setContact("");
      setUrl("");
    } catch (err: any) {
      console.error("Erro ao criar patrocinador:", err.message || err);
      setError(true);
    }
  };

  return (
    <div className="flex items-center flex-col bg-white h-screen pt-10">
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

        <ButtonFormCreate />

        <Stack marginTop="1rem">
          {success && (
            <Alert status="success" title="Patrocinador criado com sucesso!" />
          )}
          {error && (
            <Alert
              status="error"
              title="Erro ao criar patrocinador, tente novamente mais tarde."
            />
          )}
        </Stack>
      </form>
    </div>
  );
}
