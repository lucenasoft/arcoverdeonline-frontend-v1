"use client";

import { Button, Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const FormSponsor = ({
  name,
  setName,
  logo,
  setLogo,
  contact,
  setContact,
  url,
  setUrl,
}: {
  name: string;
  setName: any;
  logo: string;
  setLogo: any;
  contact: string;
  setContact: any;
  url: string;
  setUrl: any;
}) => {
  const pathname = usePathname();
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  useEffect(() => {
    let currentTitle = "Formulário de Patrocinador";
    let currentSubTitle =
      "Preencha os campos abaixo para criar ou editar o patrocinador.";

    if (pathname === "/pages/sponsors/CreateSponsor") {
      currentTitle = "Criar Patrocinador";
      currentSubTitle = "Preencha os campos abaixo para criar o patrocinador.";
    } else if (pathname.startsWith("/pages/sponsors/EditSponsor")) {
      currentTitle = "Editar Patrocinador";
      currentSubTitle = "Preencha os campos abaixo para editar o patrocinador.";
    }

    setTitle(currentTitle);
    setSubTitle(currentSubTitle);
  }, [pathname]);

  return (
    <div>
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <Fieldset.Legend className="text-2xl font-semibold text-green-700">
            {title}
          </Fieldset.Legend>
          <Fieldset.HelperText className="text-sm text-gray-500">
            {subTitle}
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
      </Fieldset.Root>
    </div>
  );
};

export default FormSponsor;
